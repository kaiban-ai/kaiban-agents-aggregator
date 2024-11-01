import { Agent, Task, Team } from 'kaibanjs';
import { Firecrawl } from '@kaibanjs/tools';

// Initialize the Firecrawl tool
const firecrawlTool = new Firecrawl({
  apiKey: import.meta.env.VITE_FIRECRAWL_API_KEY
});

// Define Agents
const contentRetrievalAgent = new Agent({
  name: 'Alex',
  role: 'Content Finder and Retriever',
  goal: 'Find the latest issues of provided newsletters and retrieve their content.',
  background: 'Web Scraping, URL Extraction, and Content Retrieval',
  tools: [firecrawlTool],
  maxIterations: 15,
});

const contentExtractorAgent = new Agent({
  name: 'Sam',
  role: 'Content Extractor and Filter',
  goal: 'Extract and filter information related to specified topics from the retrieved newsletter content.',
  background: 'Content Analysis, Information Extraction, and Topic Filtering',
  tools: [],
});

const editorAgent = new Agent({
  name: 'Oliver',
  role: 'Newsletter Editor and Personalizer',
  goal: 'Format the extracted content into a newsletter with a personalized, engaging introduction.',
  background: 'Content Organization, Newsletter Writing, and Personalization',
  tools: [],
});

// Define Tasks
const contentRetrievalTask = new Task({
  title: 'Find and Retrieve Latest Newsletter Content',
  description: `
    For each newsletter URL in {newsletters}:
    1. Find the URL of the latest issue.
    2. Retrieve the full content of the latest issue.
    Return the content from all newsletters.
  `,
  expectedOutput: 'Raw content from the latest issues of all provided newsletters.',
  agent: contentRetrievalAgent,
});

const contentExtractionTask = new Task({
  title: 'Content Extraction and Filtering Task',
  description: `
    1. Analyze ALL content from each retrieved newsletter.
    2. Extract ANY and ALL information related to the provided topics: {topics}.
    3. Use a broad interpretation of relevance to ensure no potentially relevant items are missed.
    4. For each extracted item, capture:
       - Full article title with its URL
       - Complete original description or snippet
       - Newsletter source name
       - Publication date
       - Any associated tags, categories, or keywords
    5. Group the extracted information by topic. An item can appear under multiple topics if relevant.
    6. If an item's relevance is uncertain, include it and note the uncertainty.
  `,
  expectedOutput: 'Structured data containing all extracted and filtered content, grouped by topic.',
  agent: contentExtractorAgent,
});

const editingTask = new Task({
  title: 'Newsletter Editing and Personalization Task',
  description: `
    1. Format the extracted content into a newsletter structure.
    2. Create a personalized, engaging introduction for {userName}:
       - Start with a friendly greeting using the user's name.
       - Briefly mention the topics covered ({topics}).
       - Tease some interesting content or trends from the articles.
       - Optionally, include a subtle nerdy reference (preferably Star Wars-related) that fits naturally.
       - Keep the tone professional yet friendly, suitable for a tech newsletter.
    3. Organize the content by topics, with each topic as a section.
    4. Under each topic, list the relevant entries with all captured information.
    5. Add a summary of item counts for each topic and newsletter at the end.
  `,
  expectedOutput: 'A complete, markdown-formatted newsletter',
  agent: editorAgent,
});

// Define the Team
const newsSummaryTeam = new Team({
  name: 'Dynamic News Summary Team',
  agents: [contentRetrievalAgent, contentExtractorAgent, editorAgent],
  tasks: [contentRetrievalTask, contentExtractionTask, editingTask],
  inputs: {
    newsletters: 'https://jster.net/blog, https://javascriptweekly.com/issues',
    topics: 'React, AI Agents',
    userName: 'Dariel',
  },
  env: {
    OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY,
  },
});

export default newsSummaryTeam;

/******************************************************************
 *                                                                  *
 *        🚀 Ready to supercharge your JavaScript AI Agents? 🚀    *
 *                                                                *
 * This is just a starting point, but if you're ready to flex:     *
 *                                                                *
 *   💡 Build a custom UI and control your agents like a boss.     *
 *   🛠️ Equip your agents with tools (APIs, databases—you name it).*
 *   🧠 Integrate different AI models (OpenAI, Anthropic, etc.).   *
 *   🔮 Create setups so advanced, even you'll be impressed.       *
 *                                                                *
 * JavaScript AI Agents are here to stay!                       *
 *                                                                *
 * Head to https://kaibanjs.com                                *
 * 
 * PS: It's way cooler than this basic example. 😎                 *
 *                                                                *
 ******************************************************************/
