
export function OutputWindow({ outputDetails }: any) {
  const getOutput = () => {
    let statusId = outputDetails?.status?.id;

    if (statusId === 6) {
      // compilation error
      return <pre>{atob(outputDetails?.compile_output)}</pre>;
    } else if (statusId === 3) {
      return (
        <pre>
          {atob(outputDetails.stdout) !== null
            ? `${atob(outputDetails.stdout)}`
            : null}
        </pre>
      );
    } else if (statusId === 5) {
      return <pre>{`Time Limit Exceeded`}</pre>;
    } else {
      return <pre>{atob(outputDetails?.stderr)}</pre>;
    }
  };
  return (
    <>
      <h5>Output</h5>
      <div>{outputDetails ? <>{getOutput()}</> : null}</div>
    </>
  );
}
