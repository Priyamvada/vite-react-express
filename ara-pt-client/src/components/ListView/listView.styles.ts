import { Colour, FontSize, FontWeight } from "../../assets";

export const listViewTableStyle: React.CSSProperties = {
  position: 'relative',
  borderCollapse: 'separate',
  borderSpacing: 0,
  fontSize: FontSize.small,
  width: '100%',
};

export const tableCellStyle: React.CSSProperties = {
  padding: '8px 12px',
  borderBottom: `1px solid ${Colour.borderLightGrey}`,
};

export const tableHeaderStyle: React.CSSProperties = {
  ...tableCellStyle,
  fontWeight: 'bold',
};

export const emptyCellStyle: React.CSSProperties = {
  color: Colour.textLightGrey,
  textAlign: 'center',
  fontSize: FontSize.xsmall,
};

export const numberCellStyle: React.CSSProperties = {
  textAlign: 'right',
  color: Colour.textDarkGrey,
  fontWeight: FontWeight.medium,
};

export const rowStyle: React.CSSProperties = {
  cursor: 'pointer',
};

export const selectedRowStyle: React.CSSProperties = {
  background: Colour.backgroundLightGrey,
};

export const headerRowStyle: React.CSSProperties = {
  position: 'sticky',
  top: '100px',
  zIndex: 1,
  backgroundColor: Colour.backgroundWhite,
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.08)',
};