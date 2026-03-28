The different learning paradigms in machine learning are frameworks that define how models acquire knowledge from data. These paradigms determine the type of data required, the training process, and the goals of the learning process. The three primary learning paradigms are:

1. **Supervised Learning**:  
   Models are trained on **labeled data**, where each input example comes with a known correct output (label). The goal is to learn a mapping from inputs to outputs.  
   - *Examples*:  
     - Classification (e.g., predicting whether an email is spam or not).  
     - Regression (e.g., predicting house prices based on features like size and location).  
   - *Why it matters*: This paradigm is widely used when the problem has clear, predefined outputs and labeled data is available.

2. **Unsupervised Learning**:  
   Models are trained on **unlabeled data**, with no predefined outputs. The goal is to discover hidden patterns, structures, or relationships in the data.  
   - *Examples*:  
     - Clustering (e.g., grouping customers by purchasing behavior).  
     - Dimensionality reduction (e.g., compressing high-dimensional data into lower dimensions while preserving key features).  
   - *Why it matters*: This paradigm is useful when labeled data is scarce or expensive to obtain, and the focus is on exploratory data analysis.

3. **Reinforcement Learning (RL)**:  
   Models learn by **interacting with an environment**, taking actions, and receiving feedback in the form of rewards or penalties. The goal is to maximize cumulative reward over time through trial and error.  
   - *Examples*:  
     - Training an agent to play games (e.g., chess, Go).  
     - Robotics (e.g., learning to walk by receiving rewards for stable movement).  
   - *Why it matters*: This paradigm excels in sequential decision-making tasks where the environment is dynamic and feedback is delayed.

### Key Distinctions:
| Paradigm              | Data Type       | Goal                                      | Real-World Application Example          |
|-----------------------|-----------------|--------------------------------------------|-----------------------------------------|
| **Supervised**        | Labeled         | Predict output from input                 | Spam detection, price prediction       |
| **Unsupervised**      | Unlabeled      | Discover hidden patterns                 | Customer segmentation, data compression |
| **Reinforcement**     | Interaction with environment | Maximize cumulative reward | Game playing, autonomous navigation   |

### Why These Are the Core Paradigms:
- **Supervised learning** is foundational for tasks where outcomes are well-defined and labeled data exists.  
- **Unsupervised learning** addresses scenarios with limited or no labels, enabling data exploration.  
- **Reinforcement learning** handles dynamic, sequential environments where direct feedback is critical (e.g., real-time decision-making).

While other approaches like **semi-supervised learning** (using a mix of labeled and unlabeled data) or **transfer learning** (applying knowledge from one task to another) exist, they are often extensions or special cases of the three core paradigms above.

\boxed{\text{Supervised Learning, Unsupervised Learning, Reinforcement Learning}}