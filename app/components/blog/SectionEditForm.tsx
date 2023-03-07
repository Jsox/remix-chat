import { TextInput, Text, Textarea, useMantineTheme, createStyles, } from "@mantine/core";
import { type Section } from "@prisma/client";
import { getTimeFromNow } from "app/hooks/useTime";
import { type ReactElement } from "react";
import { SectionFields } from './SectionFields';

const useStyles = createStyles((theme) => {
    return {
        label: {
            fontSize: theme.fontSizes.lg,
            paddingTop: '1rem',
            paddingBottom: '0.3rem'
        },
        input: {
            '& [disabled]': {
                color: theme.colors.gray[0]
            }
        }
    }
})

export default function SectionEditForm({ section }: { section: Section }) {
    const { classes } = useStyles()
    let jsx: ReactElement[] = [];
    const theme = useMantineTheme()

    const labelProps = {
        className: classes.label
    }
    const inputProps = {
        className: classes.input,
        size: 'md'
    }

    for (const key in SectionFields) {
        if (Object.prototype.hasOwnProperty.call(SectionFields, key)) {
            const Field = SectionFields[key];

            let data = section[key];
            const type = Field.type || null
            const ru = Field.ru || null
            const isChangeable = Field.isChangeable

            if (!type) {
                jsx.push(<TextInput {...inputProps} disabled={!isChangeable} labelProps={labelProps} aria-label={`Отредактируйте ${ru}`} name={key} label={ru} value={data} />)

            } else {
                if (type === 'text') {
                    jsx.push(<Textarea autosize
                        minRows={2} {...inputProps} disabled={!isChangeable} labelProps={labelProps} aria-label={`Отредактируйте ${ru}`} name={key} label={ru} value={data} />)
                }

                if (type === 'time') {
                    data = getTimeFromNow(data)
                    jsx.push(<TextInput {...inputProps} disabled={!isChangeable} labelProps={labelProps} aria-label={`Отредактируйте ${ru}`} name={key} label={ru} value={data} />)
                }
            }

            console.log(key, Field)
        }
    }

    return jsx
}