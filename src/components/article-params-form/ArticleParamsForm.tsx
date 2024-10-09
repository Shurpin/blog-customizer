import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { useState } from 'react';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyClasses,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

export const ArticleParamsForm = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [fontFamilyState, setFontFamilyState] = useState(fontFamilyOptions[0]);
	const [fontSizeState, setFontSizeState] = useState(fontSizeOptions[0]);
	const [fontColorsState, setFontColorsState] = useState(fontColors[0]);
	const [backgroundState, setBackgroundState] = useState(backgroundColors[0]);
	const [contentWidthArrState, setContentWidthArrState] = useState(
		contentWidthArr[0]
	);
	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form className={styles.form}>
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
							onClick={() => setIsOpen(!isOpen)}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={() => setIsOpen(!isOpen)}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
