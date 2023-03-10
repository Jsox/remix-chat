import { Anchor, Breadcrumbs, Center, Divider } from '@mantine/core';
import { Link, useOutletContext } from '@remix-run/react'
import { IconArrowMoveRight } from '@tabler/icons'

export default function BreadCrumbs({ breadCrumbs = [] }: { breadCrumbs?: { title: string; url: string }[] }) {

    const items = breadCrumbs.map(({ title, url = null }) => {
        if (!url) {
            throw new Error('Invalid url')
        }
        return <Anchor
            component={Link}
            aria-label={`Перейти к ${title}`}
            to={url}
            key={title}
            prefetch={'intent'}
        >
            {title}
        </Anchor>
    })

    return (
        <>
            <Breadcrumbs separator={<IconArrowMoveRight />} mt='xs'>
                {items}
            </Breadcrumbs>
            {/* <Divider /> */}
        </>
    )
}
