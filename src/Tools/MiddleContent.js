import MarkdownDisplay from './MarkdownDisplay';
import PNGDisplay from './PNGDisplay';
import CanvasFileDisplay from './CanvasFileDisplay';


const MiddleContent = ({ path }) => {

    const getFileExtension = () => {
        
        if (path.endsWith('.md')) {
          return 'md';
        } else if (path.endsWith('.canvas')) {
          return 'canvas';
        } else if (path.endsWith('.png')) {
          return 'png';
        } else if (!path.includes('.')) {
          return 'No file extension';
        } else {
          return 'Other file extension';
        }
      };


      const fileExtension = getFileExtension();

  return (
    <div>
      {fileExtension === 'md' ? (
        <MarkdownDisplay path={path} />
      ) : fileExtension === 'png' ? (
        <PNGDisplay path={path} />
      ) : fileExtension === 'canvas' ? (
        <CanvasFileDisplay path={path} />
      ) : fileExtension === 'No file extension' ? (
        <div>No file extension component</div>
      ) : (
        <div>Other file extension component</div>
      )}
      <label>File Type: {fileExtension} file</label>
    </div>
  );
};

export default MiddleContent;