export function getFormattedDate(capital) {
const now = new Date();
return new Intl.DateTimeFormat('fr-FR'
    , {
        timeZone: capital.tz,
        dateStyle: 'full',
        timeStyle: 'long'
    }
)
.format(now);
}