import Select from 'react-select';

const customStyles = {
  // ১. বাইরের মেইন বক্স (Control)
  control: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: 'transparent',
    borderColor: state.isFocused ? '#4F46E5' : '#D1D5DB', // ফোকাস হলে ইন্ডিগো কালার
    borderRadius: '6px',
    // minHeight: '42px',
    boxShadow: state.isFocused ? '0 0 0 1px #4F46E5' : 'none',
    '&:hover': {
      borderColor: '#4F46E5',
    },
    padding: '2px 8px',
  }),

  // ২. ড্রপডাউন মেনু (Menu)
  menu: (baseStyles) => ({
    ...baseStyles,
    borderRadius: '8px',
    boxShadow: '0 4px 11px rgba(0, 0, 0, 0.1)',
    zIndex: 999,
  }),

  // ৩. ড্রপডাউন অপশনগুলো (Option)
  option: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: state.isSelected 
      ? '#4F46E5' 
      : state.isFocused 
        ? '#EEF2FF' 
        : 'transparent',
    color: state.isSelected ? 'white' : '#374151',
    cursor: 'pointer',
    '&:active': {
      backgroundColor: '#4F46E5',
    },
  }),

  input: (baseStyles) => ({
    ...baseStyles,
    color: 'white', // সার্চ টেক্সট কালার
  }),
  // ৪. ভেতরের টেক্সট এবং প্লেসহোল্ডার
  placeholder: (baseStyles) => ({
    ...baseStyles,
    color: '#9CA3AF',
  }),
  singleValue: (baseStyles) => ({
    ...baseStyles,
    color: '#111827',
  }),
};

// ব্যবহার করার নিয়ম:
export default function MySelect(props) {

  return (
      <Select 
        styles={customStyles}
        {...props}
      />
  );
}