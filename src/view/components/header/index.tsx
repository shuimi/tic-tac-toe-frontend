import React, { ReactNode } from 'react'
import { Header, Container, Anchor } from '@mantine/core'
import { Link } from 'react-router-dom'
import { HEADER_HEIGHT, useStyles } from "./header.styles";

interface LinkProps {
	label: string;
	link: string;
}

interface BasicHeaderProps {
	links: LinkProps[];
	active: number | undefined;
	setActive: (index: number | undefined) => void;
	avatar?: ReactNode;
}

export const BasicHeader = (props: BasicHeaderProps) => {

	const { links, active, setActive, avatar } = props

	const { classes, cx } = useStyles()

	const mainItems = links.map((item, index) => (
		<Anchor
			component={Link}
			to={item.link}
			key={item.label}
			className={cx(classes.mainLink, { [classes.mainLinkActive]: index === active })}
			onClick={() => {
				setActive(index)
			}}
		>
			{item.label}
		</Anchor>
	))

	return (
		<Header height={HEADER_HEIGHT}>
			<Container size={'xl'} className={classes.inner}>
				<div className={classes.linksGroup}>
					{mainItems}
					{
						avatar
						&& <div className={classes.avatar}>
							{avatar}
						</div>
					}
				</div>
			</Container>
		</Header>
	)
}