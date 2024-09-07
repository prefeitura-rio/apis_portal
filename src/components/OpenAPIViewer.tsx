import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'

interface OpenAPIViewerProps {
  specUrl: string
}

function OpenAPIViewer({ specUrl }: OpenAPIViewerProps) {
  return (
    <div className="h-full w-full">
      <SwaggerUI url={specUrl} />
    </div>
  )
}

export default OpenAPIViewer