---
title: using gpt-4o and claude to help go thru 500 entries in a form
created: 2024-08-01
tags:
  - ramblings
---

# background

epoch0 is a server/study group that i started for ppl to study math/ml/cs together.

i put out a couple tweets that kind of blew up and directed a lot of attention to the janky waitlist form i had made for the server.

![[Pasted image 20240801090658.webp|450]]
![[Pasted image 20240801090740.webp|450]]

so that led to 500 ppl filling out this form (counting an older typeform i'd made)

![[Pasted image 20240801090848.webp|450]]

# the challenge

what i didn't want to do was explicitly judge the people based on their skills, past, present etc.

i just wanted to reject spammy, low-effort and unmotivated people from the form because that creates noise.

clarity, motivation, similarity was a big plus i was looking out for.

mostly i just wanted to filter spam/troll/low effort _out_.

# claude to the rescue

i wrote a "spec" for what i want epoch 0 to look like and then used claude to help me think through how i should evaluate the form entries.

![[Pasted image 20240801091657.webp|600]]

it asked a bunch of really cool questions, which was amazing

![[Pasted image 20240801091745.webp|600]]

a little bit of back and forth and i made it generate a system and user prompt for `gpt-4o` with an evaluation document, input format of the form entry and a JSON schema for the results.

i just wanted the entries to be classified against into;

- Highly Recommended
- Recommended
- Consider
- Not Recommended (basically the people i wanna filter _out_)

# duct taping it together ft. mr. 4o

> evals are important

after that i tested it out against a handful of people who were already in the server to see how well it "recommended"

then i tested it out against a handful of applications that were troll-y to see how well it rejected

then i tested it out against some applications which i hadn't seen before;

- i went through it and came up with my own recommendation
- i added a "justification" field in the json schema
- i then checked mr. 4o's response to see how well it aligns with my classification

after this sanity check, we were good to go!

# results

what i was dreading to do for an entire day took me like 1 hour.

![[Pasted image 20240801093539.webp]]

in the end i sent out the invite to 290 people.

many of them started joining immediately. this is what the # intro channel looks like rn.

![[Pasted image 20240801095554.webp]]

![[Pasted image 20240801095621.webp]]
