import React, { use } from 'react';
import { pageHeaderContainerStyles, pageHeaderSubtitleStyles, pageHeaderTitleStyles } from './pageHeader.styles';
import { useCookie } from '../../hooks';

/**
 * Props for the PageHeader component
 */
interface PageHeaderProps {
  /**
   * The main title to display in the header
   */
  title: string;

  /**
   * An optional subtitle to display below the title
   */
  subtitle?: string;

  /**
   * @returns Whether the header is in a loading state (if provided, can show loading indicator)
   */
  loading?: boolean;

  /**
   * @returns Callback function when subtitle is clicked (if provided, subtitle is clickable)
   */
  onSubtitleClick?: () => void;

  /**
   * @returns Text for the logout button (if provided, logout button is shown)
   */
  buttonText?: string;

  /**
   * @returns Callback function when logout is clicked (if provided, logout button is shown)
   */
  onButtonClick?: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, loading, onSubtitleClick, buttonText, onButtonClick }) => {
  const username = useCookie('username');

  return (
    <header className='page-header' style={pageHeaderContainerStyles}>
      <div >
        <div style={{...pageHeaderTitleStyles}}>{title}</div>
        {subtitle && (
          <div
          onClick={onSubtitleClick}
          style={{...pageHeaderSubtitleStyles, ...(onSubtitleClick? {textDecoration: 'underline', cursor: 'pointer'} : {})}}>
            {subtitle}
          </div>
        )}
      </div>
      { username && !loading && (
        <div style={{position: 'absolute', top:0, right:0, margin: '10px', fontSize: '14px'}}>
          <span style={{marginRight: '10px'}}>{username}</span>
          {buttonText && onButtonClick && <button onClick={onButtonClick}>{buttonText}</button> }
        </div>
      )}
    </header>
  );
};

export default PageHeader;