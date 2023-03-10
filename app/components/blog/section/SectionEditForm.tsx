import { TextInput, Text, Textarea, useMantineTheme, createStyles, Box, } from "@mantine/core";
import { useId } from "@mantine/hooks";
import { type Section } from "@prisma/client";
import RichEditorText from "app/components/RichTextEditor";
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
    const unkey = useId()

    for (const key in SectionFields) {
        if (Object.prototype.hasOwnProperty.call(SectionFields, key)) {
            const Field = SectionFields[key];

            const ukey = useId()

            let data = section[key] || '';
            const type = Field.type || null
            const ru = Field.ru || null
            const isChangeable = Field.isChangeable

            if (!type) {
                jsx.push(<TextInput key={ukey} {...inputProps} readOnly={!isChangeable} labelProps={labelProps} aria-label={`Отредактируйте ${ru}`} name={key} label={ru} defaultValue={data} />)

            } else {
                if (type === 'text') {
                    jsx.push(<Textarea key={ukey} autosize
                        minRows={2} {...inputProps} readOnly={!isChangeable} labelProps={labelProps} aria-label={`Отредактируйте ${ru}`} name={key} label={ru} defaultValue={data} />)
                }

                if (type === 'time') {
                    data = getTimeFromNow(data)
                    jsx.push(<TextInput key={ukey} {...inputProps} readOnly={!isChangeable} labelProps={labelProps} aria-label={`Отредактируйте ${ru}`} name={key} label={ru} defaultValue={data} />)
                }
                if (type === 'html') {
                    jsx.push(<Box key={ukey}><Text className={classes.label}>{ru}</Text><RichEditorText html={data} /></Box>)
                }
            }
        }
    }

    return <>{jsx}</>
}