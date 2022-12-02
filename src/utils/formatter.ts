import moment from "moment"

moment.locale("pt-br")

export function formatDate(date: string) {
    return moment(date).fromNow()
}
