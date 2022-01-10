// @flow

import React, { PureComponent } from 'react';
import type { RouterHistory, Match } from 'react-router';
import { Query } from 'react-apollo';
import Modal, { ModalHeader, ModalBody, ModalFooter } from 'components/Modal';
import SearchBar from 'components/SearchBar';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Checkbox from 'components/Checkbox';
import ControlBar, { type ControlBarItem } from 'components/ControlBar';
import PARTS_QUERY from 'gql/queries/Parts.graphql';
import SetPartItem from './PartRowAccordian';
import {
  PartTable,
  PartTableBody,
  ColumnHeader,
  PartTableCell,
} from '../../scenes/WorkOrders/WorkOrderPanel/WorkOrderView/PartAccordian/styled';

import { TabWrapper } from './styled';

import PARTS_SET_QUERY from './SetOfPartsQuery.graphql';

type Props = {
  onClose: () => void,
  t: Function,
  // eslint-disable-next-line react/no-unused-prop-types
  history: RouterHistory,
  // eslint-disable-next-line react/no-unused-prop-types
  match: Match,
  selectedParts: Object,
  handleSubmit: Function,
  session: Object,
};

type State = {
  searchInput: string,
  selectedParts: Object,
  activeTab: string,
  searchSetInput: string,
  selectedSetOfParts: Array<string>,
};

class SelectPartModal extends PureComponent<Props, State> {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    searchInput: '',
    searchSetInput: '',
    // React anti-pattern, using props for initial value as it is a modal
    selectedParts: this.props.selectedParts,
    activeTab: 'parts',
    selectedSetOfParts: [],
  };

  partSetIds = [];

  handleSearch = (value: string) => {
    this.setState({ searchInput: value });
  };

  onHandleSetOfPartSelect = (id: string) => {
    // eslint-disable-next-line react/no-access-state-in-setstate
    const idList = Array.from(this.state.selectedSetOfParts);
    const index = idList.indexOf(id);

    if (index > -1) {
      idList.splice(index, 1);
    } else {
      idList.push(id);
    }

    this.setState({
      selectedSetOfParts: idList,
    });
  };

  handleSelectPart = (id: string) => {
    const { ...state } = this.state.selectedParts;
    state[id] = !state[id];
    if (state[id]) {
      window.analytics.track('PartAdded', {
        category: 'WorkOrderDetailsCategory',
      });
    } else {
      window.analytics.track('RemovePartFromWorkOrderTapped', {
        category: 'WorkOrderDetailsCategory',
      });
    }
    this.setState({ selectedParts: state });
  };

  onHandleSetPartSelect = (idsArray: Array<string>) => {
    const { selectedParts } = this.state;
    if (selectedParts.length) {
      idsArray.forEach(partId => {
        if (!selectedParts.includes(partId)) {
          this.partSetIds.push(partId);
        }
      });
    } else {
      this.partSetIds = idsArray;
    }
  };

  handleSubmit = () => {
    const { selectedParts, activeTab } = this.state;
    const partIds = [];
    const preSelectedId = [];
    const selectedId = [];
    if (activeTab === 'parts') {
      Object.keys(selectedParts).forEach(partId => {
        if (selectedParts[partId]) {
          partIds.push(partId);
        }
      });
    }
    // eslint-disable-next-line no-restricted-syntax
    for (const key in selectedParts) {
      // eslint-disable-next-line eqeqeq
      if (selectedParts[key] == true) {
        preSelectedId.push(key);
      }
    }
    const allPartIds = [...partIds, ...this.partSetIds, ...preSelectedId];
    for (let i = 0; i < allPartIds.length; i += 1) {
      if (selectedId.indexOf(allPartIds[i]) === -1) {
        selectedId.push(allPartIds[i]);
      }
    }
    this.props.handleSubmit(selectedId);
    this.props.onClose();
  };

  handleSetPartsSearch = (value: string) => {
    this.setState({
      searchSetInput: value,
    });
  };

  handleChangeTab = (item: ControlBarItem) => {
    const { label } = item;
    this.setState({ activeTab: label.replace(/ +/g, '').toLowerCase() });
  };

  renderHeader = () => {};

  renderTable = (parts: Object) => {
    const { selectedParts } = this.state;
    const { session } = this.props;
    const currencySymbol =
      session.company && session.company.currencySymbol ? session.company.currencySymbol : '$';

    return (
      <>
        <PartTable>
          <thead>
            <tr>
              <ColumnHeader />
              <ColumnHeader>Part Name</ColumnHeader>
              <ColumnHeader align="right">Qty</ColumnHeader>
              <ColumnHeader align="right">Cost</ColumnHeader>
            </tr>
          </thead>
          <PartTableBody>
            {parts.map(ele => (
              <tr key={ele.id}>
                <PartTableCell>
                  <Checkbox
                    onClick={() => this.handleSelectPart(ele.id)}
                    checked={selectedParts[ele.id]}
                  />
                </PartTableCell>
                <PartTableCell>{ele.name}</PartTableCell>
                <PartTableCell>{ele.quantity}</PartTableCell>
                <PartTableCell>
                  {currencySymbol}
                  {ele.cost ? ele.cost.toFixed(2) : 0}
                </PartTableCell>
              </tr>
            ))}
          </PartTableBody>
        </PartTable>
        <br />
        {!parts.length ? (
          <div style={{ textAlign: 'center' }}>
            You have not added any parts. <a href="/#/app/inventory">Create a new part here.</a>
          </div>
        ) : null}
      </>
    );
  };

  renderSetOfPartsTable = (partsArr: Object) => {
    const { session } = this.props;
    const { selectedSetOfParts } = this.state;
    const currencySymbol =
      session.company && session.company.currencySymbol ? session.company.currencySymbol : '$';

    if (!partsArr) {
      return;
    }

    return (
      <>
        <PartTable>
          <thead>
            <tr>
              <ColumnHeader />
              <ColumnHeader>Set Name</ColumnHeader>
              <ColumnHeader align="right">Qty</ColumnHeader>
              <ColumnHeader align="right">Cost</ColumnHeader>
            </tr>
          </thead>
          <PartTableBody>
            {partsArr.map((partItem, idx) => {
              return (
                <SetPartItem
                  // eslint-disable-next-line react/no-array-index-key
                  key={idx}
                  partSetInfo={partItem}
                  currencySymbol={currencySymbol}
                  selectPart={this.onHandleSetPartSelect}
                  defaultChecked={selectedSetOfParts.includes(partItem.id)}
                  updateSelectList={this.onHandleSetOfPartSelect}
                />
              );
            })}
          </PartTableBody>
        </PartTable>
        <br />
        {!partsArr.length ? (
          <div style={{ textAlign: 'center' }}>
            You have not added any parts. <a href="/#/app/inventory">Create a new part here.</a>
          </div>
        ) : null}
      </>
    );
  };

  /**
   * Render a modal with a form for initiating a new group message
   * @return {React$Node}
   */
  render() {
    const limit = 10;
    const { t } = this.props;
    const { searchInput, activeTab, searchSetInput } = this.state;
    const localeKey = 'modals.selectParts';

    return (
      <Modal maxWidth={600} padding={30}>
        <ModalHeader header={t(`${localeKey}.header`)} onClose={this.props.onClose} />
        <ModalBody withPadding>
          <TabWrapper>
            <ControlBar
              className="parts-select"
              onSelectItem={item => this.handleChangeTab(item)}
              center={[
                {
                  type: 'tab',
                  label: 'Parts',
                  value: activeTab === 'parts',
                  data: {},
                },
                {
                  type: 'tab',
                  label: 'Set of Parts',
                  value: activeTab === 'setofparts',
                  data: {},
                },
              ]}
            />
          </TabWrapper>
          {activeTab === 'parts' ? (
            <Query query={PARTS_QUERY} variables={{ search: searchInput, limit }}>
              {({ loading, data }) => {
                return (
                  <>
                    <SearchBar
                      size="sm"
                      onClick={event => event.stopPropagation()}
                      onSearchChange={this.handleSearch}
                    />
                    <br />
                    {loading ? <Loader /> : this.renderTable(data.parts)}
                  </>
                );
              }}
            </Query>
          ) : (
            <Query query={PARTS_SET_QUERY} variables={{ search: searchSetInput, limit }}>
              {({ loading, data }) => {
                return (
                  <>
                    <SearchBar
                      size="sm"
                      onClick={event => event.stopPropagation()}
                      onSearchChange={this.handleSetPartsSearch}
                    />
                    <br />
                    {// eslint-disable-next-line no-nested-ternary
                    loading ? (
                      <Loader />
                    ) : data.partSets.length ? (
                      this.renderSetOfPartsTable(data.partSets)
                    ) : (
                      <div style={{ textAlign: 'center' }}>
                        No set of parts found. Create set under the{' '}
                        <a target="_blank" href="/#/app/set-of-parts">
                          Set of Parts
                        </a>{' '}
                        section.
                      </div>
                    )}
                  </>
                );
              }}
            </Query>
          )}
        </ModalBody>
        <ModalFooter>
          <Button theme="cancel" type="submit" pill onClick={this.props.onClose}>
            {t(`${localeKey}.cancel`)}
          </Button>
          <Button theme="blue-gradient" pill onClick={this.handleSubmit}>
            {t(`${localeKey}.submit`)}
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default SelectPartModal;
