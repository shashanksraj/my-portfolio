import DetailSection from '../../components/DetailSection'
import FlowDiagram from '../../components/FlowDiagram'
import ProjectLinks from '../../components/ProjectLinks'
import ProjectPageLayout from '../../components/ProjectPageLayout'
import { StatList, TermList } from '../../components/ProjectBlocks'
import type { Project } from '../../data/projects'

function HateSpeechPage({ project }: { project: Project }) {
  return (
    <ProjectPageLayout project={project}>
      <DetailSection title="Overview">
        <div className="prose">
          <p>
            This project classifies online posts as sexist or not sexist, one
            specific case of the wider problem of detecting harmful speech
            online. It uses the labeled data from SemEval 2023 Task 10,
            Explainable Detection of Online Sexism (EDOS), and treats the task
            as a binary label.
          </p>
          <p>
            The goal was to compare approaches. I turned the text into features
            two ways, TF-IDF and Word2Vec, and trained scikit-learn classifiers
            on them: Naive Bayes, Logistic Regression, K-Nearest Neighbors,
            and Random Forest.
          </p>
        </div>
      </DetailSection>

      <DetailSection title="Data Pipeline" wide>
        <FlowDiagram
          label="Data pipeline stages"
          caption="Preprocessing, feature extraction, training, and evaluation."
          steps={[
            { title: 'Dataset', note: 'Labeled online posts', endpoint: true },
            {
              title: 'Preprocessing',
              note: 'Cleaning, tokenizing, lemmatizing',
            },
            { title: 'Features', note: 'TF-IDF and Word2Vec' },
            { title: 'Training', note: 'Four classifiers' },
            {
              title: 'Evaluation',
              note: 'Precision, recall, accuracy, F1',
              endpoint: true,
            },
          ]}
        />
      </DetailSection>

      <DetailSection title="NLP Processing">
        <TermList
          items={[
            {
              term: 'Preprocessing',
              description:
                'Text is lowercased, stripped of emojis and other non-ASCII characters, tokenized with NLTK, cleaned of punctuation and English stop words, and lemmatized. Every model sees the same cleaned text.',
            },
            {
              term: 'TF-IDF',
              description:
                'Represents each post as weighted word counts: words that are frequent in a post but rare across the dataset get more weight.',
            },
            {
              term: 'Word2Vec',
              description:
                'A Word2Vec model is trained on the posts to learn 100-dimensional word vectors, and each post is represented by the average of its word vectors. The values are shifted to be non-negative so Naive Bayes can use them.',
            },
          ]}
        />
      </DetailSection>

      <DetailSection title="Models and Evaluation">
        <TermList
          items={[
            {
              term: 'Classifiers',
              description:
                'Naive Bayes, Logistic Regression, K-Nearest Neighbors, and Random Forest, all from scikit-learn.',
            },
            {
              term: 'Choosing settings',
              description:
                'For K-Nearest Neighbors I tried k from 1 to 15 and compared weighted F1. The Random Forest weights the sexist class more heavily, since it is the less common class.',
            },
            {
              term: 'Metrics',
              description:
                'Each model is scored on the dataset’s test split with precision, recall, accuracy, and weighted F1.',
            },
          ]}
        />
      </DetailSection>

      <DetailSection title="Results">
        <div className="block-stack">
          <StatList
            items={[
              { value: '1,086', label: 'posts in the test split' },
              {
                value: '0.80',
                label: 'weighted F1, best run (Random Forest on TF-IDF)',
              },
            ]}
          />
          <div className="prose">
            <p>
              These numbers come from a single recorded evaluation on the
              dataset&apos;s test split, not from repeated or cross-validated
              experiments. The sexist class is the harder one to get right: for
              that same model, the F1 on the sexist class alone was 0.60.
            </p>
          </div>
        </div>
      </DetailSection>

      <DetailSection title="Source Code">
        <div className="block-stack">
          <div className="prose">
            <p>
              The whole workflow, from preprocessing to evaluation, lives in a
              single Jupyter notebook in the repository. The dataset file is not
              included there.
            </p>
          </div>
          <ProjectLinks project={project} />
        </div>
      </DetailSection>
    </ProjectPageLayout>
  )
}

export default HateSpeechPage
