export const handleSSEResponse = (response, {
  onData,
  onComplete,
  onError
}) => {
  if (!response.body) throw new Error("ReadableStream not supported");

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let partialData = "";

  const readStream = () => {
    reader.read().then(({ done, value }) => {
      if (done) {
        console.log("Stream closed");
        onComplete?.();
        return;
      }

      // Convert Uint8Array to String and accumulate data
      partialData += decoder.decode(value, { stream: true });

      // Process all complete JSON objects in the accumulated buffer
      let lines = partialData.split("\n");
      partialData = ""; // Reset buffer

      lines.forEach(line => {
        if (line.startsWith("data:")) {
          try {
            const jsonString = line.replace("data:", "").trim();
            const data = JSON.parse(jsonString);
            onData?.(data);
          } catch (error) {
            // If JSON parsing fails, it means we have an incomplete chunk. Store it in the buffer.
            partialData = line;
          }
        }
      });

      readStream(); // Continue reading stream
    });
  };

  readStream();
}; 