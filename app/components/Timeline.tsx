export default function TimelineComponent({ items }: { items: TimelineItemProps[] }) {
    return (
        <div>
            <h2>TimelineComponent</h2>
            <p>This is where the TimelineComponent will be displayed.</p>

            {/* Arrow goes here */}

            <div>
                {items.map((item) => (
                    <TimelineItem key={item.id} {...item} />
                ))}
            </div>
        </div>
    );
}

export interface TimelineItemProps {
    id: string;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
}

export function TimelineItem({ id, title, description, startDate, endDate }: TimelineItemProps) {
    return (
        <div>
            <h3>{title}</h3>
            <p>{description}</p>
            <p>Start Date: {startDate.toLocaleDateString()}</p>
            <p>End Date: {endDate.toLocaleDateString()}</p>
        </div>
    );
}