export const DropIndicator = ({cardId, columnId}) => {
    return <div 
        data-card-id={cardId || '-1'}
        data-column-id={columnId}
        className="my-0.5 h-1 w-full bg-violet-400 opacity-0"
    />
}