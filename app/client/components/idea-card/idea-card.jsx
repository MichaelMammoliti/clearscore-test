import React from 'react';
import moment from 'moment';

import { Button } from '../index';
import styles from './idea-card.scss';

class IdeaCard extends React.Component {
  constructor(props) {
    super(props);

    this.hasAlreadyFocused = false;

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);

    this.inputRef = React.createRef();
  }

  // Lifecycle
  // =============================================
  componentDidMount() {
    this.focusTitleInput();
  }

  componentDidUpdate() {
    this.focusTitleInput();
  }

  // Ref inputs
  // =============================================
  focusTitleInput() {
    if (!this.props.editMode) {
      this.hasAlreadyFocused = false;
    }

    if (!this.hasAlreadyFocused && this.inputRef && this.inputRef.current && this.props.editMode) {
      this.hasAlreadyFocused = true;

      this.inputRef.current.focus();
    }
  }


  // Events
  // =============================================
  handleTitleChange(event) {
    const { value } = event.target;

    this.props.onChange({
      title: value,
    });
  };

  handleDescriptionChange(event) {
    const { value } = event.target;

    this.props.onChange({
      description: value,
    });
  };

  handleEditClick() {
    this.props.onEdit(this.props.id);
  };

  handleRemoveClick() {
    this.props.onRemove(this.props.id);
  };

  // Render
  // =============================================
  render() {
    const {
      editMode,
      description,
      title,
      createdOn,
      updatedOn,
      onConfirm,
      onCancel,
    } = this.props;

    return (
      <div className={styles['idea-card']}>

        <div className={styles['idea-card__title']}>
          {(editMode)
            ? (
              <input
                type='text'
                name='title'
                defaultValue={title}
                placeholder='title'
                ref={this.inputRef}
                onChange={this.handleTitleChange}
              />
            )
            : (
              <p>{title}</p>
            )
          }
        </div>

        <div className={styles['idea-card__description']}>
          {(editMode)
            ? (
              <textarea
                name='description'
                defaultValue={description}
                onChange={this.handleDescriptionChange}
                placeholder='description'
              />
            )
            : (
              <p>{description}</p>
            )
          }
        </div>

        {editMode && (
          <div className={styles['idea-card__actions']}>
            <div className={styles['idea-card__actions-confirm']}>
              <Button onClick={onConfirm} text='confirm' />
            </div>
            <div className={styles['idea-card__actions-cancel']}>
              <Button onClick={onCancel} text='cancel' />
            </div>
          </div>
        )}

        {!editMode && (
          <div className={styles['idea-card__dates']}>
            {createdOn && (
              <div className={styles['idea-card__dates__created-on']}>
                <p>created on: {moment(createdOn).format('D/MM/Y')}</p>
              </div>
            )}

            {updatedOn && (
              <div className={styles['idea-card__dates__updated-on']}>
                <p>updated on: {moment(updatedOn).format('D/MM/Y')}</p>
              </div>
            )}
          </div>
        )}

        {!editMode && (
          <div className={styles['idea-card__actions']}>
            <div className={styles['idea-card__actions-edit']}>
              <Button onClick={this.handleEditClick} text='edit' />
            </div>
            <div className={styles['idea-card__actions-remove']}>
              <Button onClick={this.handleRemoveClick} text='remove' />
            </div>
          </div>
        )}

      </div>
    );
  }
};

IdeaCard.displayName = 'IdeaCard';

IdeaCard.defaultProps = {
  onRemove: () => {},
  onEdit: () => {},
  onConfirm: () => {},
  onChange: () => {},
  onCancel: () => {},
  editMode: false,
  title: '',
  description: '',
  id: undefined,
};

export default IdeaCard;
