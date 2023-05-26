import MarkdownDisplay from './MarkdownDisplay';
import PNGDisplay from './PNGDisplay';
import CanvasFileDisplay from './CanvasFileDisplay';
import GIFDisplay from './GIFDisplay';


const MiddleContent = ({ path }) => {

    const getFileExtension = () => {
        
        if (path.endsWith('.md')) {
          return 'md';
        } else if (path.endsWith('.canvas')) {
          return 'canvas';
        } else if (path.endsWith('.png')) {
          return 'png';
        } else if (path.endsWith('.gif')) {
            return 'gif';
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
        ) : fileExtension === 'gif' ? (
            <GIFDisplay path={path} />
      ) : fileExtension === 'canvas' ? (
        <CanvasFileDisplay path={path} />
      ) : fileExtension === 'No file extension' ? (
        <div style={{color:'red'}}>Cant Load</div>
      ) : (
        <div style={{color:'red'}}>File Extention not suported</div>
      )}
    </div>
  );
};

export default MiddleContent;