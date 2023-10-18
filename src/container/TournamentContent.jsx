import DayRepresentation from '../components/DayRepresentation'
import GoBack from '../components/GoBack'

const TournamentContent = () => {
  return (
    <div className='my-5 mx-3'>
      <GoBack />
        <DayRepresentation dayNumber={1} />
        <DayRepresentation dayNumber={2} />
        <DayRepresentation dayNumber={3} />
        <DayRepresentation dayNumber={4} />
        <DayRepresentation dayNumber={5} />
        <DayRepresentation dayNumber={6} />
        <DayRepresentation dayNumber={7} />
    </div>
  )
}

export default TournamentContent