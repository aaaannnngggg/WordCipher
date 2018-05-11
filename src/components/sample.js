/**
 * Cusotom image reject reason modal
 *
 * @author    Jonathan Wang <fwang@wayfair.com>
 * @copyright 2018 Wayfair LLC - All rights reserved
 */
import Modal from 'extranet_modal';

class CustomImageRejectReasonComponent extends React.Component {
  static propTypes = {
    rejectModalOpened: PropTypes.bool.isRequired,
    closeRejectModal: PropTypes.func.isRequired,
    rejectReasons: PropTypes.array,
    requestStatusChangeArgs: PropTypes.array,
    requestStatusChange: PropTypes.func.isRequired
  };
  state = {
    checkedIDs: [],
    reasonNote: '',
    requestStatusChangeArgs: this.props.requestStatusChangeArgs,
    rejectModalOpened: this.props.rejectModalOpened
  };
  componentWillReceiveProps(nextProps) {
    this.setState({ requestStatusChangeArgs: nextProps.requestStatusChangeArgs, rejectModalOpened: nextProps.rejectModalOpened});
  }
  toggleRejectReason = (e) => {
    const reasonCode = parseInt(e.target.value, 10);
    const wasChecked = this.state.checkedIDs.includes(reasonCode);
    if (!wasChecked) {
      this.setState(
        (prevState) => {
          return {checkedIDs: [...prevState.checkedIDs, reasonCode]};
        }
      );
    } else {
      this.setState(
        (prevState) => {
          return {checkedIDs: prevState.checkedIDs.filter(currentReasonCode => reasonCode !== currentReasonCode)};
        }
      );
    }
  };
  handleCloseRejectModal = () => {
    this.props.closeRejectModal();
    this.setState({checkedIDs: [], reasonNote: ''});
  };
  handleChangeReasonNote = (e) => {
    this.setState({reasonNote: e.target.value});
  };
  handleClickReworkModalSubmit = () => {
    if (this.state.requestStatusChangeArgs != null) {
      // This is a little subtle.  Because reason modal is open still,
      // this call will send the modal checkboxes/reasonNote info to
      // the server.
      this.props.requestStatusChange(...this.state.requestStatusChangeArgs);
      // Now close the modal and let user continue interacting with the page.
      this.handleCloseRejectModal();
    }
  };
  render() {
    return (
      <Modal
        isOpen={this.props.rejectModalOpened}
        onRequestClose={this.handleCloseRejectModal}
      >
        <CustomImageCheckboxes
          checkboxes={this.props.rejectReasons}
          checkedIDs={this.state.checkedIDs}
          toggleCheckbox={this.toggleRejectReason}
        />
        {this.state.checkedIDs.includes(CustomImageConstants.OTHER_REASON_ID) && (
          <TextInput
            placeholder={Lnrs.translate('EnterDescriptionOfReworkNeeded', 'Enter Description of Rework Needed')}
            label={Lnrs.translate('ReworkNeededColon', 'Rework needed:')}
            onChange={this.handleChangeReasonNote}
            value={this.state.reasonNote}
            isTextarea
          />
        )}
        <div className="text_right margin_top_medium">
        <span className="margin_right_medium">
          <Button
            onClick={this.handleClickReworkModalSubmit}
            disabled={this.state.checkedIDs.length === 0}
          >
            <Lnrs key="Submit">Submit</Lnrs>
          </Button>
        </span>
          <Button secondary onClick={this.handleCloseRejectModal}>
            <Lnrs key="Cancel">Cancel</Lnrs>
          </Button>
        </div>
      </Modal>
    );
  }
}
export default CustomImageRejectReasonComponent;