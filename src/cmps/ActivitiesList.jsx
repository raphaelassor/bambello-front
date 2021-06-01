import { ActivityPreview } from './ActivityPreview'
export function ActivitiesList({ activities, isGeneral }) {
       console.log('im here')
    const sortedActivities = activities.sort((a, b) => b.createdAt - a.createdAt)
    
    return (
        <div className="activities-list">
            {sortedActivities.map(activity => {
                return <ActivityPreview key={activity.id} activity={activity} isGeneral={isGeneral} />
            })}
        </div>
    )
}