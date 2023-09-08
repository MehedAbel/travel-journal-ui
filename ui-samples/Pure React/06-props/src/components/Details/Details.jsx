import './Details.css'

export const Details = (props) => {
    const {budget = 'No Budget', description = 'No Description'} = props
    return (
        <div className="details">
            <p>Budget: <span>{budget}</span></p>
            <p>Description: {description}</p>
        </div>
    )
}
