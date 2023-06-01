import React, { Component } from 'react';
import fetchingData, { selectedVault, setRep, selectedRep } from './dataFetcher';
import './FileDisplay.css';
import { handleButtonClick, handleFileClick, removeLeadingHyphens, logSpaces, setGlobalTerms, getFilePath } from './buttonUtils';
import { getSingleVaultByLabel } from './buttonsDef';

class MarkdownDisplay extends Component
{
  constructor(props) {
    super(props);

    this.state = {
      terms: null,
      hiddenItems: [],
      closed: [],
      selected: null,
      showContextWindow: false,
      contextWindowTop: 0,
      contextWindowLeft: 0,
      shouldHide: true
    };
  }


  
  handleGearButtonClick = (event) => {
    const gearButtonRect = event.target.getBoundingClientRect(); // Get the position of the gear button
    const windowTop = gearButtonRect.top ; // Calculate the top position of the context window
    const windowLeft = gearButtonRect.left+ gearButtonRect.width + (window.innerWidth * 0.01); // Calculate the left position of the context window

    this.setState((prevState) => ({
      showContextWindow: !prevState.showContextWindow,
      contextWindowTop: windowTop,
      contextWindowLeft: windowLeft,
    }));
  };

  componentDidMount() 
  {        
    if(selectedRep === ' '){
      setRep(getSingleVaultByLabel(selectedVault)?.link,selectedVault);
    }
    this.fetchFileData();
    
    //For now I'm doing this here
    this.props.handlePathChange("/Home.md");

    setGlobalTerms(this.state.terms);
  }

  fetchFileData = async () => {
    try {
      const markdownData = await fetchingData('text', '/MetaInfo/' + selectedVault + 'Dir.md');
      this.setState({ terms: markdownData });
      // Do something with the markdownData, such as displaying it in the component state or rendering it.
    } catch (error) {
      // Handle any errors that occur during the fetch.
      console.error('Error fetching Markdown data:', error);
    }
  };

  handleClick(type, spacesCount, text) {
    if (type === 'fileButton darker') {
      const newState = handleButtonClick(this.state, spacesCount, text);
      this.setState(newState);
    } else {
      const newState = { selected: { spacesCount: spacesCount, text: text } };
      this.setState(newState);

      const path = handleFileClick(this.state, spacesCount, text);

      const newPath = path;
      this.props.handlePathChange(newPath);
    }
  }

  handleShowHiddenClick = () => 
  {
    const newState = {shouldHide: !this.state.shouldHide}
    this.setState(newState);
  };

  handleIDKClick = () => {
    // Handle the "IDK" button click logic here
  };

  render() {
    const { terms, hiddenItems, shouldHide } = this.state;

    const contextWindowStyle = {
      top: this.state.contextWindowTop,
      left: this.state.contextWindowLeft,
    };

    if (!terms) {
      return <div>Loading...</div>;
    }

    const lines = terms.split('\n');

    const nonEmptyLines = lines.filter((line) => line !== ''); // Filter out empty lines

    return (
      <div className='content-displayFile'>
         <div className="footer-displayFile">
            <a href='https://github.com/VoidVariable/CrazyRamblings'>GitHub</a>
        </div>
        <div className="header-displayFile">
          <span className="header-title">Deltarune Data</span>
          <button className="gear-button" onClick={this.handleGearButtonClick}>
            <span className="gear-icon">⚙️</span>
          </button>
        </div>
        <div className="button-contents">
          {nonEmptyLines.map((line, index) => {
            setGlobalTerms(this.state.terms);
            const spacesCount = logSpaces(line);
            const trimmedLine = removeLeadingHyphens(line);

            var buttonClassName = trimmedLine.includes('.') ? 'fileButton' : 'fileButton darker';

            if (this.state.selected?.spacesCount === spacesCount && this.state.selected?.text === trimmedLine) {
              buttonClassName = 'fileButton selected';
            }

            var spacePadding = '\u00A0'.repeat((Math.max(spacesCount - 1, 0) * 4));
            var arrow = '';

            const hideFile =  !shouldHide || !getFilePath(logSpaces(line), trimmedLine).includes('[Hide]');

            if (spacesCount !== 0) {
              spacePadding += '\u00A0\u00A0\u00A0\u00A0';
            }

            if (buttonClassName === 'fileButton darker') {
              arrow = this.state.closed.some(
                (item) => item.spacesCount === spacesCount && item.text === trimmedLine
              )
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
          })}
        </div>
        {this.state.showContextWindow && (
          <div style={contextWindowStyle} className="context-window-FD">
            <button className="context-button" onClick={this.handleShowHiddenClick}>
              Show hidden
              {shouldHide && (
                <span className="box-icon">□</span>
              )}
              {!shouldHide && (
                <span className="box-icon">☑</span>
              )}
            </button>
            {/* <button className="context-button" onClick={this.handleIDKClick}>
              IDK
            </button> */}
          </div>
        )}
       
      </div>   
    );
  }
}

export default MarkdownDisplay;
