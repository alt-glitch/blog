---
title: open research questions in LLM and NLP research
link: open-research-questions
date created: 2024-08-22
---

i came across this [amazing paper](https://arxiv.org/abs/2305.12544) which discusses research areas and ideas that still need to be worked upon.

it's a really comprehensive paper that details 14 open research topics, each with 3-4 research ideas that can and need to be worked on.

following is a list of the topics and ideas mentioned in the paper.

---

## 1. Fundamental NLP

### 1.1 Multilinguality

- **Low-resource machine translation**
  - Developing small benchmarks for low-resource languages
  - Creating large training corpora for languages with limited web presence
  - Exploring manually curated parallel corpora
  - Using OCR for low-resource language data
  - Developing translation dictionaries using models of word formation

- **Multilingual models that work well for all languages**
  - Addressing inequality in performance across languages
  - Incorporating off-the-shelf LLMs into MT systems
  - Improving performance on languages with limited representation in training data

- **Code-switching**
  - Addressing challenges of large variation in code-switching phenomena
  - Developing methods for synthetic data generation
  - Evaluating existing LLMs on code-switched text across language combinations
  - Distinguishing highly similar languages and dialects

### 1.2 Reasoning

- **Complex reasoning**
  - Improving numerical reasoning capabilities
  - Enhancing logical reasoning skills
  - Developing grounded reasoning abilities
  - Advancing causal inference capabilities
  - Combining strengths of neural networks and symbolic AI
  - Integrating LLMs with external reasoning tools (calculators, interpreters, database interfaces, search engines)

- **Responsible reasoning in social contexts**
  - Developing models for moral reasoning in complicated scenarios
  - Incorporating different social contexts and cultural backgrounds in reasoning
  - Collaborating with domain experts and policymakers

- **Formally defining reasoning and designing proper evaluation frameworks**
  - Refining the definition of reasoning in the context of LLMs
  - Developing methods to test reasoning skills in the face of data contamination
  - Addressing Goodhart's law in reasoning evaluation
  - Creating reliable metrics for multi-step reasoning evaluation

### 1.3 Knowledge Bases

- **Automatic knowledge base construction**
  - Improving knowledge coverage and factuality
  - Enhancing knowledge linking capabilities
  - Addressing out-of-distribution data challenges
  - Mitigating hallucination in knowledge graph completion

- **Knowledge-guided NLP**
  - Developing efficient and effective ways to interact with external knowledge bases
  - Exploring web browsing for knowledge acquisition
  - Improving customized knowledge base lookup methods

- **Culture-specific knowledge and common sense**
  - Understanding limitations of NLP models regarding cultural knowledge
  - Acquiring and representing knowledge encoding diverse cultural views
  - Developing methods to invoke cultural knowledge appropriately

### 1.4 Language Grounding

- **Fusing multiple modalities**
  - Developing efficient and effective methods for combining different modalities
  - Addressing challenges of competing modalities in multimodal models

- **Grounding for less studied modalities**
  - Exploring physiological, sensorial, or behavioral modalities
  - Integrating less-studied modalities with current multimodal LLMs

- **Grounding "in the wild" and for diverse domains**
  - Collecting and utilizing data from realistic "in the wild" settings
  - Adapting models to fewer data points or different types of data in diverse domains
  - Incorporating domain expertise for better problem setup understanding

### 1.5 Child Language Acquisition

- **Sample-efficient language learning**
  - Mimicking learning strategies of children for better generalization
  - Improving performance of NLP models while reducing required training data

- **Language models as biological models for child language acquisition**
  - Using neural models as biological models for human cognitive behavior
  - Comparing models' learning curves with children's age of acquisition for different words
  - Exploring phoneme-level acquisition and intrinsic rewards in language learning

- **Benchmark development in child language acquisition**
  - Creating new language acquisition benchmarks
  - Augmenting controlled experiments with large video datasets of children learning language

### 1.6 Non-Verbal Communication

- **Non-verbal language interpretation**
  - Analyzing non-verbal cues (facial expressions, gestures, body language)
  - Determining universal sets of expressions and gestures across modalities, contexts, and cultures

- **Sign language**
  - Addressing high variability in manual gestures for data curation and evaluation
  - Incorporating additional information (facial expressions, body pose, eye gaze)
  - Developing sign language generation for various scenarios

- **Joint verbal and non-verbal communication**
  - Representing, fusing, and interpreting verbal and non-verbal signals jointly
  - Developing language models for each modality and effective fusion methodologies

---

## 2. Responsible NLP

### 2.1 NLP and Ethics

- **Dual use**:
  - Addressing the potential misuse of NLP technologies
  - Developing safeguards against malicious applications (e.g., deceptive text generation, misinformation campaigns)
  - Interdisciplinary collaboration to combat unethical uses of NLP

- **Fairness**:
  - Evaluating and mitigating bias in NLP models
  - Investigating dataset creation practices and their correlation with model bias
  - Developing stricter requirements for data creation to reduce inequalities

- **Privacy**:
  - Addressing concerns about access to user data through LLMs
  - Exploring privacy-preserving methods such as:
    - Differential privacy
    - Federated learning
    - Secure multi-party computation

- **Attribution of machine-generated data**:
  - Developing standard approaches for attribution in NLP-generated content
  - Addressing copyright and plagiarism issues in AI-generated text
  - Exploring membership inference techniques for identifying training data influence

### 2.2 Interpretability

- **Probing**:
  - Investigating internal representations of NLP models
  - Designing probing tasks to reveal linguistic and world knowledge
  - Identifying potential biases in model representations

- **Mechanistic interpretability**:
  - Uncovering underlying mechanisms in model decision-making
  - Extracting computational subgraphs from neural networks
  - Reverse engineering deep neural networks

- **Human-in-the-loop approaches**:
  - Incorporating human feedback to enhance model interpretability
  - Developing interactive explanation generation techniques
  - Exploring active learning for interpretability

- **Reference-based text generation**:
  - Improving reliability of generated text through step-by-step explanations
  - Developing methods to supply references or sources for model claims
  - Enhancing traceability of information in generated content

### 2.3 Green/Efficient NLP

- **Model efficiency**:
  - Improving attention mechanisms for better efficiency
  - Exploring sparsity in models to scale up width while reducing FLOPs
  - Developing mixture-of-experts architectures
  - Optimizing architectures for balance between economics, efficiency, and performance

- **Efficient downstream task adaptation**:
  - Developing methods for adapting pre-trained models with minimal parameter updates
  - Exploring techniques like prompt-tuning and prefix-tuning
  - Investigating parameter-efficient fine-tuning approaches

- **Data efficiency**:
  - Removing redundant or noisy data from training datasets
  - Developing effective methods for data deduplication in vast corpora
  - Exploring data curation techniques for very large datasets

### 2.4 NLP for Online Environments

- **Combating misinformation**:
  - Developing fact-checking technology across different languages and modalities
  - Utilizing network analysis to track the spread of false content
  - Exploring retrieval and knowledge-augmented methods for context verification
  - Addressing hallucinations and factual inconsistencies in LLMs

- **Ensuring content diversity**:
  - Addressing the amplification of majority voices in LLM-generated content
  - Developing techniques to preserve and promote diverse perspectives
  - Investigating methods to counteract the under-representation of marginalized groups

- **Preventing mis- and over-moderation**:
  - Developing nuanced content moderation techniques that consider context and cultural differences
  - Addressing the risk of unfairly deleting safe speech by minority groups
  - Investigating the impact of political interests on online content filtering
  - Developing methods to trace and analyze topics that are filtered or demoted online

---

## 3. Applied NLP

### 3.1 NLP for Healthcare

#### Healthcare benchmark construction

- Strategies to create and scale-up health datasets
- Synthetic data generation for healthcare
- Data augmentation from existing data
- Metrics to measure fidelity of synthetic data compared with real data

#### Improving clinical communication

- Simplifying medical jargon for laymen
- Developing educational tools for healthcare professionals
- Providing personalized healthcare recommendations
- Developing advanced NLP models for medical dialogue systems
- Exploring ethical implications of NLP-driven communication in healthcare

#### Drug discovery

- Extracting and analyzing information from scientific literature, patents, clinical records
- Identifying and prioritizing drug-target interactions
- Discovering new drug candidates
- Predicting compound properties
- Optimizing drug designs

### 3.2 NLP for Education

#### Intelligent tutoring systems

- Generating targeted practice questions
- Explaining students' mistakes in various subjects
- Developing human-in-the-loop checks for reliability
- Addressing challenges of diverse data, privacy concerns, and trustworthiness
- Improving evaluation mechanisms

#### Educational explanation generation

- Generating explanations for complicated questions or reading materials
- Developing explanations for automatic grading systems
- Addressing concerns of overreliance on AI models
- Balancing AI support with human teaching

#### Controllable text generation

- Generating memorable stories corresponding to students' academic skill levels and interests
- Addressing domain diversity while pursuing controllability
- Developing reliable evaluation techniques for text generation with diverse control requirements
- Creating dedicated benchmarks and datasets for controlled text generation

### 3.3 Computational Social Science

#### Development of new abstractions, concepts, and methods

- Advancing NLP methods for computational social science (CSS)
- Developing customized, high-level text analyses for CSS
- Evolving evaluation paradigms to capture validity of LLMs as language generators
- Addressing challenges of large target label spaces in CSS tasks

#### Population-level data annotation and labeling

- Using LLMs to annotate data simulating human interactions
- Comparing LLM effectiveness with human annotations
- Addressing LLMs' tendency for higher recall than precision in annotations

#### Multicultural and multilingual CSS

- Conducting large-scale, multilingual, and multicultural analyses
- Studying language evolution across cultures
- Analyzing value variations across cultures
- Addressing under-representation of minority communities and low-resource languages
- Developing temporal grounding for CSS research

### 3.4 Synthetic Datasets

#### Knowledge distillation

- Transferring knowledge from larger models to smaller models
- Utilizing LLM outputs as synthetic examples
- Transforming or controlling generated data for quality
- Emulating LLM behavior with smaller, focused models

#### Control over generated data attributes

- Developing robust, controllable, and replicable pipelines for synthetic data generation
- Optimizing prompts for specific data attributes
- Addressing challenges in specifying attributes through instructions or examples

#### Transforming existing datasets

- Applying changes to create semantically preserving new datasets
- Format change (e.g., converting HTML news articles to plain text)
- Modality transfer (e.g., generating textual descriptions of images or videos)
- Style transfer (e.g., translating writing style from verbose to concise)
