import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import styles from './ArticleParamsForm.module.scss';
import { fontFamilyOptions, fontSizeOptions } from 'src/constants/articleProps';
import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

export const ArticleParamsForm = () => {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const sidebarRef = useRef<HTMLFormElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				setIsFormOpen(false);
			}
		};

		if (isFormOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isFormOpen]);

	return (
		<>
			<ArrowButton
				isOpen={false}
				onClick={() => {}}
				aria-label='Открыть настройки'
			/>
			<aside
				className={styles.container}
				aria-labelledby='article-params-title'>
				<ArrowButton
					isOpen={isFormOpen}
					onClick={() => setIsFormOpen(!isFormOpen)}
					aria-label={isFormOpen ? 'Закрыть настройки' : 'Открыть настройки'}
				/>
				<aside
					ref={sidebarRef}
					className={clsx(styles.container, {
						[styles.container_open]: isFormOpen,
					})}
					aria-hidden={!isFormOpen}
				/>
				<form className={styles.form} onSubmit={(e) => e.preventDefault()}>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={fontFamilyOptions[0]}
						aria-required
					/>
					<RadioGroup
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={fontSizeOptions[0]}
						name=''
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							aria-label='Сбросить все настройки к исходным'
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							aria-label='Применить выбранные настройки'
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
