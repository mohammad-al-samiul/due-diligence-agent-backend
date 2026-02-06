export type JobPayloadMap = {
  INDEX_DOCUMENT: {
    documentId: string;
  };

  CREATE_PROJECT: {
    projectId: string;
  };

  GENERATE_ANSWER: {
    answerId: string;
  };
};
