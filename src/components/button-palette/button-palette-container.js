import { connect } from 'react-redux';

import * as actions from 'flux/calc/actions';
import ButtonPalette from './button-palette';

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    onClick(number) {
      dispatch(actions.buttonPress(number));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonPalette);
