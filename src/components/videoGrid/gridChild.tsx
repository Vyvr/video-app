import { FC } from 'react';
import { Button } from 'reactstrap';

import './gridChild.css';

interface GridChildProps {
  thumbnailId: string;
  thumbnailUrl: string;
  title: string;
  favourite: boolean;
  viewCount: string;
  likeCount: string;
  addDate: string;
}

const GridChild: FC<GridChildProps> = (props) => {
  return (
    <div id="children-container">
      <img
        id="grid-thumbnail"
        key={props.thumbnailId}
        src={props.thumbnailUrl}
        alt={props.title}
      />
      <div id="title-label">{props.title}</div>
      <div id="action-info-container">
        <div id="info-conteiner">
          <div id="info-line">
            <i id="info-icon" className="bi bi-eye" />
            <label id="info-label">{props.viewCount}</label>
          </div>
          <div id="info-line">
            <i id="info-icon" className="bi bi-hand-thumbs-up" />
            <label id="info-label">{props.likeCount}</label>
          </div>
          <div id="info-line">
            <i id="info-icon" className="bi bi-calendar-plus" />
            <label id="info-label">{props.addDate}</label>
          </div>
        </div>
        <div id="action-container">
          <Button id="action-button" color="primary">
            <i className="bi bi-collection-play-fill" />
          </Button>
          <Button
            id="action-button"
            color={props.favourite ? 'danger' : 'secondary'}
          >
            <i
              className={
                props.favourite ? 'bi bi-heart-fill' : 'bi bi-heart'
              }
            />
          </Button>
          <Button id="action-button" color="dark">
            <i className="bi bi-trash-fill" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GridChild;
