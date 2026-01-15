import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import DocumentViewer from './components/DocumentViewer';
import { getDocumentContent, hasDocumentContent } from './data/documentContents';

const DocumentDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    // If no ID or document doesn't have content, redirect to data room
    if (!id || !hasDocumentContent(id)) {
        return <Navigate to="/data-room" replace />;
    }

    const documentContent = getDocumentContent(id);

    if (!documentContent) {
        return <Navigate to="/data-room" replace />;
    }

    return <DocumentViewer document={documentContent} />;
};

export default DocumentDetailPage;
