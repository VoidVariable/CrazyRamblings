import MarkdownDisplay from './MarkdownDisplay';
import ImageDisplay from './ImageDisplay';
import CanvasFileDisplay from './CanvasFileDisplay';
import GIFDisplay from './GIFDisplay';


const MiddleContent = ({ path }) => {

    const getFileExtension = () => {
        if (path.endsWith('.md')) {
          return 'md';
        } else if (path === 'null') {
          return 'empty';
        } else if (path.endsWith('.canvas')) {
          return 'canvas';
        } else if (path.match(/\.(jpeg|jpg|png)$/i)) {
          return 'img';
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
        <>
          {fileExtension === 'md' ? (
            <MarkdownDisplay path={path} />
          ) : fileExtension === 'img' ? (
            <ImageDisplay path={path} />
          ) : fileExtension === 'gif' ? (
            <GIFDisplay path={path} />
          ) : fileExtension === 'canvas' ? (
            <CanvasFileDisplay path={path} />
          ) : fileExtension === 'No file extension' ? (
            <div style={{ color: 'red' }}>Can't Load</div>
          ) : (
            <div style={{ color: 'red' }}>File Extension not supported</div>
          )}
        </>
      );
};

export default MiddleContent;