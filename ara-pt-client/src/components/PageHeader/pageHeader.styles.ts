import * as React from "react";
import { Colour, FontSize, FontWeight } from "../../assets";

export const pageHeaderContainerStyles: React.CSSProperties = {
  flexDirection: 'column',
  display: 'flex',
  paddingBottom: '16px',
  position: 'sticky',
  zIndex: 10,
  width: '100%',
  minWidth: '80vh',
  backgroundColor: Colour.backgroundDarkGrey,
  top: 0,
};

export const pageHeaderTitleStyles: React.CSSProperties = {
  fontSize: FontSize.xlarge,
  lineHeight: FontSize.xxlarge,
  fontWeight: FontWeight.bold,
  color: Colour.textWhite,
  margin: '10px 10px 4px 10px',
};

export const pageHeaderSubtitleStyles: React.CSSProperties = {
  fontSize: FontSize.medium,
  lineHeight: FontSize.xlarge,
  margin: '16px 10px 0 10px',
  color: Colour.textLightGrey,
};