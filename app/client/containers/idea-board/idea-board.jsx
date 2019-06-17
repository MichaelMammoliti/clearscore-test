import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from './state/actions';
import { IdeaCard, Button } from '../../components';

import styles from './idea-board.scss';

export class IdeaBoard extends React.Component {
  constructor(props) {
    super(props);

    this.handleRemove = this.handleRemove.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSortBy = this.handleSortBy.bind(this);
  }

  // Lifecycle
  // =============================================
  componentDidMount() {
    this.props.actions.load();
  }

  // Events
  // =============================================
  handleCreate() {
    if (this.props.temporaryIdea) {
      return;
    }

    this.props.actions.create();
  }

  handleEdit(id) {
    this.props.actions.edit(id);
  }

  handleRemove(id) {
    this.props.actions.remove(id);
  }

  handleConfirm() {
    this.props.actions.confirm();
  }

  handleChange(data) {
    this.props.actions.change(data);
  }

  handleCancel() {
    this.props.actions.cancel();
  }

  handleSortBy(event) {
    this.props.actions.sortBy(event.target.value);
  }

  // Render
  // =============================================
  render() {
    const { ideas, temporaryIdea, ideaToEdit, sortBy } = this.props;

    const commonIdeaCardProps = {
      onEdit: this.handleEdit,
      onConfirm: this.handleConfirm,
      onRemove: this.handleRemove,
      onChange: this.handleChange,
      onCancel: this.handleCancel,
    };

    return (
      <div className={styles['idea-board']}>

        <div className={styles['idea-board__navigation']}>
          <div className={styles['idea-board__navigation-item']}>
            <Button onClick={this.handleCreate} text='create' />
          </div>
          <div className={styles['idea-board__navigation-item']}>
            <select onChange={this.handleSortBy} value={sortBy}>
              <option value='title'>title</option>
              <option value='date'>date</option>
            </select>
          </div>
        </div>

        <div className={styles['idea-board__body']}>

          {temporaryIdea && (
            <div className={styles['idea-board__item']}>
              <IdeaCard
                {...temporaryIdea}
                {...commonIdeaCardProps}
                editMode
              />
            </div>
          )}

          {(!ideas || !ideas.length) &&
            <div>no ideas</div>
          }

          {!!(ideas && ideas.length) &&
            ideas.map(ideaItem => (
              <div
                className={styles['idea-board__item']}
                key={ideaItem.id}
              >
                <IdeaCard
                  {...ideaItem}
                  {...commonIdeaCardProps}
                  editMode={ideaToEdit && ideaToEdit.id === +ideaItem.id}
                />
              </div>
            ))
          }

        </div>

      </div>
    );
  }
};

const mapStateToProps = ({ ideaBoard }) => ({ ...ideaBoard });
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(IdeaBoard);
