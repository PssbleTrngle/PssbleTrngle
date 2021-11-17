import { isUndefined, omitBy } from 'lodash'
import { DateObjectUnits, DateTime } from 'luxon'
import { FC } from 'react'

export function formatDate(date: DateObjectUnits) {
   const format = { ...DateTime.DATE_FULL }
   if (isUndefined(date.day)) format.month = 'long'
   const omitted = omitBy(format, (_, k) => !Object.keys(date).includes(k))
   return DateTime.fromObject(date).toLocaleString(omitted)
}

const Time: FC<{ dates: DateObjectUnits[] }> = ({ dates }) => {
   return <small>{dates.sort().map(formatDate).join(' - ')}</small>
}

export default Time
