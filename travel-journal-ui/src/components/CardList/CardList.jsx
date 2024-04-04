import Card from "../Card/Card.jsx";
import '../CardList/index.css'

const CardList = ({entities, onEdit}) => {
    const renderCards = entities.map((item) => {
        return <div key={item.id} className="col custom-col">
            <Card card={item} onEdit={() => onEdit(item)} />
        </div>;
    });

    return (
        <div className="d-flex flex-wrap flex-row p-2 gap-4">
            {renderCards}
        </div>
    );
};

export default CardList;
