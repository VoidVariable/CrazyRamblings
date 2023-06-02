import React from 'react';
import { removeLeadingHyphens, logSpaces, getFilePath } from './buttonUtils';
import'./FileDisplay.css'

class FileButton extends React.Component {
  handleClick(type, spacesCount, text) {
    // Handle click logic here
  }

  render() {
    const { line, index, shouldHide, hiddenItems } = this.props;

    const spacesCount = logSpaces(line);
    const trimmedLine = removeLeadingHyphens(line);

    var buttonClassName = trimmedLine.includes('.') ? 'fileButton' : 'fileButton darker';

    if (this.props.selected?.spacesCount === spacesCount && this.props.selected?.text === trimmedLine) {
      buttonClassName = 'fileButton selected';
    }

    var spacePadding = '\u00A0'.repeat((Math.max(spacesCount - 1, 0) * 4));
    var arrow = '';

    const hideFile = !shouldHide || !getFilePath(logSpaces(line), trimmedLine).includes('[Hide]');

    if (spacesCount !== 0) {
      spacePadding += '\u00A0\u00A0\u00A0\u00A0';
    }

    if (buttonClassName === 'fileButton darker') {
      arrow = this.props.closed.some((item) => item.spacesCount === spacesCount && item.text === trimmedLine)
        ? '▶'
        : '▼';
      spacePadding = '\u00A0'.concat(spacePadding);
    } else {
      if (spacesCount !== 0) {
        spacePadding = spacePadding.substring(0, spacePadding.length - 4);
        spacePadding = spacePadding + '|\u00A0\u00A0\u00A0';
      }
    }

    const shouldDisplayButton = !hiddenItems.some(
      (item) => item.lineSpacesCount === spacesCount && item.newText === line
    );
    console.log(line);

    return (
      <div key={index} className="button-line">
        {shouldDisplayButton && hideFile && (
          <button
            className={buttonClassName}
            onClick={() => {
              this.handleClick(buttonClassName, spacesCount, trimmedLine);
            }}
          >
            {spacePadding}
            {arrow && <span className="arrow">{arrow}</span>}
            {trimmedLine}
          </button>
        )}
      </div>
    );
  }
}

export default FileButton;
