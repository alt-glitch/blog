---
title: Looking at Alibaba's progress in Deep Research
link: deep-research-rl
date created: 2025-10-05
draft: "true"
tags:
  - papers
---
I've been reading up a bit on RL environments recently. While looking to adapt some research papers, benchmarks and evaluations into prime intellect's [environment hub](https://app.primeintellect.ai/dashboard/environments), I came across a bunch of interesting work around deep research, a paradigm where LLM based agents perform complex multi-step research to answer very difficult questions.

You might know this to be the feature in ChatGPT that let's you find out how a particular genre is evolving with the change in peope's music taste by asking it to read 19 research papers.

![[SCR-20251005-qilq-2.png]]
While ChatGPT Deep Research was launched in February 2025, I first encountered this set of problem in the GAIA benchmark released in 2023 which created 450 easy to validate but hard to solve problems for "general purpose agents". These tasks were all web-based and required complex web search, summarisation, good tool calling to be solved.
I remember opening up and reading AutoGen's implementation with `gpt-4o` to learn about multi-agent systems and eventually beat GAIA :D

Much has happened since then, and while reading up on interesting RL environments to work.

This blog post is a sequential log of my traversal down the rabbit hole of frontier open-source deep research models, mostly centered around Alibaba's DeepResearch *research* work because man do they ship **fast**.

## WebSailor
This paper mostly highlights a data synthesis and training pipeline for deep research LLM agents.

They break down information seeking tasks into three levels:
1. Single hop QA.
	- Example: *"Who received the Richard Dawkins Award in 2004?"*
2. Multi hop QA with a single clear path
	- Example: *"Who was the first academician of the Chinese Academy of Sciences from the alma mater of Alibaba’s current CEO?"*
3. Fuzzy QA with high uncertainty, high difficulty and no clear relationships between entities
	- Example: *"There was an early Christian poetic hymn composed by a late antique writer who passed away around the mid-5th century. The year of this writer’s death coincides with the last year of a scientific chronology that reconstructs environmental conditions from several centuries before the modern era. What is the name of this chronology?"*

### Generating the dataset
The first idea of the paper is the synthetically generate QA + reasoning and tool call traces for the third level.

**Generating the QA**
An entity is received from Wikidata’s SPARQL service and a knowledge graph is seeded. Using a combination of simulated web browsing, entity extraction, sampling sub graphs and obfuscation the synthetic QA dataset is constructed.

> To be fair, this part is still not very clear and a bit vague to me. There's potential in recreating this.

**Constructing reasoning trajectories**
They construct the trajectories as follows:
- Use an existing OSS reasoning model, generate the complete solution trajectory with it's reasoning saved.
- Discard the original reasoning keeping only the "action - observation" sequence. Only the action to be taken (for eg; a tool call) and the observation of the environment (for eg; what information it needs, what the result of the tool call is)
	**Explanation**: Since reasoning models have their own *style* of reasoning. Training one model with the reasoning trace of another could potentially stifle it's own strategy and style.
- Then, the entire trajectory is traversed back again and a frontier reasoning model generates the reasoning trace again but only using the "action - observation" sequence. So for each step the reasoning for **why** an action was taken is generated back in. But this time, a "short CoT" filter is applied so the reasoning trace fits within the token budget while being high quality.


### Training
It's been noted that SFT cold-starts the RL process and teaches the model tool use, reasoning techniques and format following.
Without this, rewards in the RL stage are very sparse.

**Rejection Sampling Fine-Tuning**
The following samples from the constructed dataset are pruned or rejected:
1. Trajectories where the correct final answer is not reached.
2. Trajectories exceeding 32k tokens in length.
3. Trajectories with less than 5 tool calls.

Tokens corresponding to environment observation (like tool responses) are masked from loss calculation.

**Duplicating Sampling Policy Optimization**
RL / agent training is a little different and slower since rollouts are multi-turn and have interactions with external environments. To speed things up, they employ a strategy where for a given batch, rollouts with no standard deviation are rejected and replaced with a more "informative" case -- a case with a non-zero std. deviation.

These cases have a higher learning signal in a batch than one where the model is "always correct" or "always incorrect".

[DAPO](https://arxiv.org/abs/2503.14476) on the other hand on dropping a case will refill it with a new QA and start its rollouts. This is slower since I/O with dataset along with inference + environment interaction time for a new rollout slows things down.

In contrast, DUPO simply duplicates the case with "higher learning" signal and starts with the next batch.

### Adaptable as an RL environment?

**Possible with a lot of effort**

WebSailor releases the tools that they've used to train the model on. `search` for web search and `visit` for reading the contents for a page.

They also outline their reward mechanism.

$$
R_i = 0.1 \cdot R_i^{\text{format}} + 0.9 \cdot R_i^{\text{answer}}
$$

However they haven't released their dataset which makes it quite hard to reconstruct it as an RL environment for existing hubs.

## WebSailor V2
Alibaba *ships fast*.

Just two months after WebSailor, they release WebSailorV2 building up on the previous paper.

- They focus on sticking to the simple ReAct paradigm since they want to maximise performance through model training since one can always optimise the harness, tools and prompts later on. Doing it during training might take away from enhancing the core capabilities, reasoning and agenticness of the model. Very "The Bitter Lesson"-pilled of them.

The tools available to the model are expanded to the following:
1. Search
2. Visit
3. Google Scholar
4. Python interpreter

### Dataset
Highlighting the drawback of expanding the dataset by using an expansive strategy of starting with "easy" and traversing "hard" questions, they detail that these tend to form pretty acyclic structures which have straight lines of reasoning.

### Training
Interestingly, to speed up the RL process, they build a simulated environment of a Wikipedia database and adapt the tools to work on the simulation. This lets them scale the simulated environment for faster rollouts, environment responses and avoid the unpredictability of search API calls.

They detail that the increase in performance is not due to any algorithmic advancements but the more consistent distribution in their synthetic dataset and the stability of the simulated environment.

There is mention of an "automated, closed loop, data policy" that synthesizes and filters the training data during the training run. Unfortunately not much information is shared here.

---

## WebShaper

WebShaper seems to be the most obvious research that can be adapted as an RL environment to add since they detail the dataset, reward rubric, eval set as well as the prompt and tools.

While this paper talks about using knowledge projects and set theory to create the dataset, I was more interested in the training methodology adapting it as an RL environment.

They deploy two agents 
The agent trained on the dataset is equipped with two runtime tools:
- **Search:** Google queries (several in parallel), returning top‑10 results per query with title, snippet, and URL.
- **Visit:** Fetches full page content (via Jina) and produces a goal‑conditioned summary (their implementation uses a large model, e.g., Qwen‑2.5‑72B, to extract information relevant to the specified goal).

For evaluations, they use LLM-as-a-judge to evaluate the performance of the trained agent on the given QA. This is a valid rubric that can be used during training.

