import { useState, useEffect } from "react";

export type ProcessedWord = {
  date: string;
  time: string;
  word: string;
  definition: string;
  example: string;
};

export const useProcessedWord = (data: any |null)=> {
  const [processedWord, setProcessedWord] = useState<ProcessedWord | null>(null);


  useEffect(() => {
    if (!data) return ;

    const getCurrentDateTime = () => {
      const now = new Date();
      return {
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString(),
      };
    };

    const findDefinitionWithExample = () => {
      const allDefinitions = data.meanings.flatMap((meaning:any) =>
        meaning.definitions
      );
      const definitionsWithExamples = allDefinitions.filter(
        (def:any) => def.example
      );

      if (definitionsWithExamples.length === 0) return null;

    
      const mediumDefinition = definitionsWithExamples.reduce((prev:any, curr:any) => {
        const prevLength = prev.definition.length;
        const currLength = curr.definition.length;
        return Math.abs(currLength - 50) < Math.abs(prevLength - 50) ? curr : prev;
      });

      return mediumDefinition;
    };

    const definitionWithExample = findDefinitionWithExample();

    if (!definitionWithExample) return;

    const { date, time } = getCurrentDateTime();

    setProcessedWord({
      date,
      time,
      word: data.word.slice(0,1).toUpperCase()+data.word.slice(1).toLowerCase(),
      definition: definitionWithExample.definition,
      example: definitionWithExample.example || "No example available.",
    });
  }, [data]);

  return processedWord;
};


