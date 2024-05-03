import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.css';

const Breadcrumbs = () => {
    // Get the current path of the page
    const currentPath = window.location.pathname;

    // Split the path into segments
    const pathSegments = currentPath.split('/').filter((segment) => segment !== '');

    // Initialize breadcrumbs with the "Travels" link
    let breadcrumbs = [{ name: 'Travels', path: '/' }];
    let pathSoFar = '/';
    for (let i = 0; i < pathSegments.length; i++) {
        pathSoFar += pathSegments[i] + '/';
        breadcrumbs.push({ name: pathSegments[i], path: pathSoFar });
    }

    return (
        <div id={styles['breadcrumbs']}>
            <ol>
                {breadcrumbs.map((breadcrumb, index) => (
                    <li
                        key={index}
                        className={
                            index === 0
                                ? styles['breadcrumb-item-first']
                                : styles['breadcrumb-item']
                        }
                    >
                        {index !== 0 && ' / '}
                        {index === breadcrumbs.length - 1 ? (
                            <span className={styles['breadcrumb-text']}>{breadcrumb.name}</span>
                        ) : (
                            <Link to={breadcrumb.path} className={styles['breadcrumb-link']}>
                                {breadcrumb.name}
                            </Link>
                        )}
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default Breadcrumbs;
