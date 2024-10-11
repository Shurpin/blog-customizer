import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { useEffect, useRef, useState } from 'react';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyClasses,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

type TProps = {
	defaultAppState: typeof defaultArticleState;
	onSubmit: (value: typeof defaultArticleState) => void;
};

export const ArticleParamsForm = ({ defaultAppState, onSubmit }: TProps) => {
	const rootRef = useRef<HTMLDivElement>(null);

	const [isOpen, setIsOpen] = useState(false);
	const [fontFamilyState, setFontFamilyState] = useState(
		defaultAppState.fontFamilyOption
	);
	const [fontSizeState, setFontSizeState] = useState(
		defaultAppState.fontSizeOption
	);
	const [fontColorsState, setFontColorsState] = useState(
		defaultAppState.fontColor
	);
	const [backgroundState, setBackgroundState] = useState(
		defaultAppState.backgroundColor
	);
	const [contentWidthArrState, setContentWidthArrState] = useState(
		defaultAppState.contentWidth
	);

	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				isOpen && setIsOpen(false);
			}
		};

		window.addEventListener('mousedown', handleClick);

		return () => {
			window.removeEventListener('mousedown', handleClick);
		};
	}, [setIsOpen, isOpen]);

	return (
		<div ref={rootRef}>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();

						onSubmit({
							fontFamilyOption: fontFamilyState,
							fontColor: fontColorsState,
							backgroundColor: backgroundState,
							contentWidth: contentWidthArrState,
							fontSizeOption: fontSizeState,
						});
					}}>
					<div className={styles.elem}>
						<Text
							family={
								fontFamilyState.className as (typeof fontFamilyClasses)[0]
							}>
							Задайте параметры
						</Text>
					</div>
					<div className={styles.elem}>
						<Select
							title='шрифт'
							selected={fontFamilyState}
							onChange={(item) => setFontFamilyState(item)}
							options={fontFamilyOptions}
						/>
					</div>
					<div className={styles.elem}>
						<RadioGroup
							name='font-size'
							options={fontSizeOptions}
							selected={fontSizeState}
							onChange={setFontSizeState}
							title='размер шрифта'
						/>
					</div>
					<div className={styles.elem}>
						<Select
							title='цвет шрифта'
							selected={fontColorsState}
							onChange={setFontColorsState}
							options={fontColors}
						/>
					</div>
					<div className={styles.elem}>
						<Separator />
					</div>
					<div className={styles.elem}>
						<Select
							title='цвет фона'
							selected={backgroundState}
							onChange={setBackgroundState}
							options={backgroundColors}
						/>
					</div>
					<div className={styles.elem}>
						<Select
							title='цвет фона'
							selected={contentWidthArrState}
							onChange={setContentWidthArrState}
							options={contentWidthArr}
						/>
					</div>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={() => {
								setFontFamilyState(defaultArticleState.fontFamilyOption);
								setFontColorsState(defaultArticleState.fontColor);
								setBackgroundState(defaultArticleState.backgroundColor);
								setContentWidthArrState(defaultArticleState.contentWidth);
								setFontSizeState(defaultArticleState.fontSizeOption);

								onSubmit({
									fontFamilyOption: defaultArticleState.fontFamilyOption,
									fontColor: defaultArticleState.fontColor,
									backgroundColor: defaultArticleState.backgroundColor,
									contentWidth: defaultArticleState.contentWidth,
									fontSizeOption: defaultArticleState.fontSizeOption,
								});
							}}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
