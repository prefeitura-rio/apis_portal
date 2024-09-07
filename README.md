# APIs Portal - Escritório de Dados

This project is an API documentation portal for the Escritório de Dados. It provides a user-friendly interface to explore and interact with various API specifications using Swagger UI.

## Features

- Dynamic loading of multiple API specifications
- Interactive API documentation using Swagger UI
- Responsive design for desktop and mobile devices
- Easy navigation between different API documentations

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- Swagger UI

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-organization/apis-portal.git
   cd apis-portal
   ```

2. Install dependencies:
   ```
   npm install
   ```

   or if you're using yarn:
   ```
   yarn install
   ```

## Deployment

### GitHub Pages

This project is set up to automatically deploy to GitHub Pages using GitHub Actions. Every push to the `main` branch will trigger a new build and deployment.

To set up GitHub Pages deployment:

1. Go to your GitHub repository settings.
2. Navigate to the "Pages" section.
3. Under "Source", select "GitHub Actions" as the deployment source.

The site will be available at `https://your-username.github.io/apis-portal/`

### Manual Deployment

If you prefer to deploy manually or to a different platform:

1. Build the project:
   ```
   npm run build
   ```
2. Deploy the contents of the `dist` directory to your web server or hosting platform of choice.

For example, if you're using Netlify or Vercel, you can connect your repository and set the build command to `npm run build` and the publish directory to `dist`.

## Adding New APIs

To add a new API to the portal:

1. Open the `src/apis.tsx` file.
2. Add a new entry to the `apis` array with the following format:

   ```typescript
   { name: "Your New API Name", url: "https://your-new-api.com/openapi.json" }
   ```

3. Save the `apis.tsx` file.
4. The new API will automatically appear in the header of the application, allowing users to view its documentation.

No restart or rebuild is necessary as the changes will be reflected immediately due to React's hot module replacement.

## Configuration

The list of APIs is managed in the `public/apis.yaml` file. This file is read by the application to dynamically load and display API documentation.

## Project Structure

- `src/` - Contains the source code for the React application
  - `components/` - React components used in the application
  - `App.tsx` - Main application component
  - `main.tsx` - Entry point of the application
- `public/` - Public assets and the `apis.yaml` configuration file
- `vite.config.ts` - Vite configuration file
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration

## Available Scripts

In the project directory, you can run:

- `npm run dev` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm run lint` - Runs the linter to check for code style issues
- `npm run preview` - Locally preview the production build

## Customization

- To change the styling, modify the Tailwind classes in the components or update the `tailwind.config.js` file.
- To adjust the layout or functionality, edit the components in the `src/components/` directory or the main `App.tsx` file.

## Troubleshooting

If you encounter any issues:

1. Ensure all dependencies are installed correctly.
2. Check that the `apis.yaml` file is properly formatted and accessible.
3. Verify that the API URLs in `apis.yaml` are correct and accessible.
4. Check the browser console for any error messages.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

Your Name - your.email@example.com

Project Link: [https://github.com/your-organization/apis-portal](https://github.com/your-organization/apis-portal)