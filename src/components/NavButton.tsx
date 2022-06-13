import {NavButtonProp} from '../types';

const NavButton = (props: NavButtonProp) => {
  return (
    <button
      className="btn btn-primary"
      onClick={() =>
        props.setPage((page) => (props.text === 'next' ? (page += 1) : (page -= 1)))
      }
      disabled={props.disabled}
      data-testid={props.text}
    >
      {props.text}
    </button>
  );
};

export default NavButton;
