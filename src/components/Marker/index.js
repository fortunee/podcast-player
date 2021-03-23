import { SERVER_URL } from '../../constants';

const Marker = ({ type, start, duration, content, link }) => {
  return (
    <div className="marker">
      {type === 'image' ? (
        <img src={`${SERVER_URL}${content}`} alt="Marker" />
      ) : (
        <a href={link}>{content}</a>
      )}
    </div>
  );
};

export default Marker;
