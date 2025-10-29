/**
 * Column definition for a given column of the ListView component
 */
export interface ColumnProps {
  /**
   * The unique key that maps to the corresponding field in the ListItem's data object
   */
  key: string;

  /**
   * The display label for the column header
   */
  label: string;

  /**
   * Optional placeholder text to display if the cell value is null/undefined/empty
   */
  placeholder?: string;

  /**
   * The data type of the column (for formatting purposes)
   */
  type: 'text' | 'number' | 'date' | 'boolean' | 'icon';

  /**
   * Custom render function for the column's cell content.
   * This ignores listItem[key] and uses the render function's output instead, if defined.
   * @param item 
   * @returns 
   */
  render?: (item?: ListItem) => React.ReactNode;

  /**
   * NOT IMPLEMENTED YET
   * Whether the column is sortable (default: false)
   */
  sortable?: boolean;

  /**
   * NOT IMPLEMENTED YET
   * Whether the column is via search queries (default: false)
   */
  filterable?: boolean;

  /**
   * Optional custom styles for the column's cells
   * Note: headerStyle is a separate prop to allow different styling for header vs body cells
   */
  style?: React.CSSProperties;

  /**
   * Optional custom styles for the column header cell
   * Note: style is a separate prop to allow different styling for header vs body cells
   */
  headerStyle?: React.CSSProperties;
}

/**
 * An individual item (row) in the ListView table
 */
export interface ListItem {
  /**
   * A unique identifier for the item
   */
  id: string;

  /**
   * Optional primary key for the item (if applicable)
   */
  pk?: string;

  /**
   * The data object representing the item's details, to populate the various columns
   */
  data: { [key: string]: any };
}

/**
 * Props for the ListView component
 */
export interface ListViewProps {
  /**
   * The list of items (rows) to display in the ListView table
   */
  items: ListItem[];

  /**
   * The column definitions for the ListView table
   */
  columnProps: ColumnProps[];

  /**
   * Optional callback function triggered when a list item is clicked
   * @param item - The clicked ListItem
   * @returns 
   */
  onItemClick?: (item: ListItem) => void;
}