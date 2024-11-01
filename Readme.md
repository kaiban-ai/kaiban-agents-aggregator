# kaiban-agents-aggregator

A powerful AI-powered newsletter aggregator built with KaibanJS and React. This project demonstrates how to utilize multiple AI agents to automatically fetch, filter, and format content from newsletters, all in a streamlined JavaScript environment. Perfect for developers looking to harness AI to keep up with the latest news, without the clutter.

## Features
- **AI Agents for Content Aggregation**: Fetch, filter, and format newsletter content using KaibanJS agents.
- **React Integration**: A custom React UI to manage and display aggregated newsletter content.
- **Quick Setup**: Get started in just a few minutes with minimal configuration.
- **Real-Time Visualization**: Use the Kaiban Board to track your agents' workflow visually.

## Getting Started

### Prerequisites

- Node.js (v14 or newer recommended)
- npm or yarn

### Environment Variables

Create a `.env` file in the project root and add your API keys:
```env
VITE_FIRECRAWL_API_KEY=your_firecrawl_api_key_here
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AI-Champions/kaiban-agents-aggregator.git
   cd kaiban-agents-aggregator
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Initialize KaibanJS in your project:
   ```bash
   npx kaibanjs@latest init
   ```

### Running the Application

There are two ways to run the application:

1. **Run the Kaiban Board**
   ```bash
   npm run kaiban
   ```
   This will open the Kaiban Board locally to visualize your agents' workflow.

2. **Run the React UI**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   This will start the development server for the React UI.

## Usage

- To adjust the agents or modify the workflow, edit `team.kban.js`. 

- If you want to make changes to the UI, you can find the relevant components inside the `src` folder.


## Contributing
We welcome contributions to improve this project! Feel free to open issues or submit pull requests to help make AI development more accessible to everyone.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact
If you have any questions or suggestions, feel free to reach out.

- Website: [kaibanjs.com](https://kaibanjs.com)
- GitHub: [KaibanJS](https://github.com/kaiban-ai/KaibanJS)
- Twitter: [@KaibanJS](https://twitter.com/KaibanJS)

Happy coding!
