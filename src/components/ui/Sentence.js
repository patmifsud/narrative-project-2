function Sentence(props) {
   return (
      <div className={`sentence pl${props.content.position}`}>
         <div className="username">{props.content.username}</div>
         {props.content.text}
      </div>
      );
    }

export default Sentence;