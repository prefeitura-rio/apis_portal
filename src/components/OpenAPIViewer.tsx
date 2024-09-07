import React, { forwardRef, useImperativeHandle, useEffect } from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

interface OpenAPIViewerProps {
  specUrl: string;
  selectedEndpoint: string | null;
}

const OpenAPIViewer = forwardRef<any, OpenAPIViewerProps>(({ specUrl, selectedEndpoint }, ref) => {
  const scrollToOperation = (operationId: string) => {
    console.log("Attempting to scroll to:", operationId);
    
    // Split the operationId into method and path
    const [method, ...pathParts] = operationId.split(' ');
    const path = pathParts.join(' ').trim(); // Rejoin in case the path itself contains spaces
    
    console.log("Method:", method, "Path:", path);

    // Try to find the element using various selectors
    const selectors = [
      `[data-path="${path}"]`,
      `[id*="${method.toLowerCase()}"][id*="${path.split('/').pop()}"]`,
      `[id*="${path.split('/').pop()}"]`,
      `[data-path*="${path.split('/').pop()}"]`,
      `.opblock-${method.toLowerCase()}`,
    ];

    for (const selector of selectors) {
      console.log("Trying selector:", selector);
      const elements = document.querySelectorAll(selector);
      console.log(`Found ${elements.length} elements with selector:`, selector);
      
      for (const element of elements) {
        console.log("Element innerHTML:", element.innerHTML);
        if (element.innerHTML.includes(path)) {
          console.log("Element found with selector:", selector);
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // Expand the operation if it's collapsed
          const expandButton = element.querySelector('.opblock-summary');
          if (expandButton && !element.classList.contains('is-open')) {
            (expandButton as HTMLElement).click();
          }
          return;
        }
      }
    }

    console.warn(`Could not find element for operation: ${operationId}`);
  };

  useImperativeHandle(ref, () => ({
    scrollToOperation
  }));

  useEffect(() => {
    if (selectedEndpoint) {
      // Add a larger delay to ensure the SwaggerUI has finished rendering
      setTimeout(() => scrollToOperation(selectedEndpoint), 2000);
    }
  }, [selectedEndpoint]);

  return (
    <div className="h-full w-full">
      <SwaggerUI url={specUrl} />
    </div>
  );
});

export default OpenAPIViewer;