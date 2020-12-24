import { useMemo, useState, useCallback } from 'react';
import DataGrid from 'react-data-grid';
import { useAtom } from 'jotai';
import { Flex, Button, Group } from 'bumbag';
import { followingLiveAtom } from '../../Atoms/all';

import 'react-data-grid/dist/react-data-grid.css';
import './DataGrid.css';

/*
{
    from_id: "28104715",
    from_name: "zsocw",
    to_id: "500128827",
    to_name: "codemiko",
    followed_at: "2020-12-22T23:16:40Z"
}

{
    game_id: "509658"
    game_name: "Just Chatting"
    id: "39956837213"
    language: "ja"
    started_at: "2020-12-23T20:50:53Z"
    tag_ids: null
    thumbnail_url: "https://static-cdn.jtvnw.net/previews-ttv/live_user_yuninja8-{width}x{height}.jpg"
    title: "(JA/EN/DE) ♡Merry Chrismas♡"
    type: "live"
    user_id: "416879419"
    user_name: "yuninja8"
    viewer_count: 0
}
*/

const columns = [
    {
        key: "to_name",
        name: "Username",
        filterRenderer: p => (
            <div className="rdg-filter-container">
                <input
                    className="rdg-filter"
                    value={p.value}
                    onChange={e => p.onChange(e.target.value)}
                />
            </div>
        )
    },
    {
        key: "type",
        name: "Is Live"
    },
    {
        key: "viewer_count",
        name: "Viewers"
    },
    {
        key: "game_name",
        name: "Playing"
    },
    {
        key: "thumnail_url",
        name: "Screencap"
    },
    {
        key: "language",
        name: "Language"
    },
    {
        key: "followed_at",
        name: "Followed"
    },
];

export function HeaderFilters() {
    const [rows] = useAtom(followingLiveAtom);

    const [filters, setFilters] = useState({
        to_name: '',
    });

    const [[sortColumn, sortDirection], setSort] = useState(['to_name', 'NONE']);

    const [enableFilterRow, setEnableFilterRow] = useState(true);

    const sortedRows = useMemo(() => {
        if (sortDirection === 'NONE') return rows;

        let sortedRows = [...rows];

        switch (sortColumn) {
            case 'to_name':
            case 'thumbnail_url':
            case 'language':
            case 'followed_at':
                sortedRows = sortedRows.sort((a, b) => a[sortColumn] ? a[sortColumn].localeCompare(b[sortColumn]) : -1);
                break;
            case 'type':
            case 'game_name':
                sortedRows = sortedRows.sort((a, b) => a[sortColumn] === b[sortColumn] ? 1 : a[sortColumn] ? 0 : -1);
                break;
            case 'viewer_count':
                sortedRows = sortedRows.sort((a, b) => a[sortColumn] - b[sortColumn]);
                break;
            default:
        }

        return sortedRows;
    }, [rows, sortColumn, sortDirection]);

    const filteredRows = useMemo(() => {
        return sortedRows.filter(r => {
            return filters.to_name ? r.to_name.includes(filters.to_name) : true;
        });
    }, [sortedRows, filters]);

    function clearFilters() {
        setFilters({
            to_name: ''
        });
    }

    function toggleFilters() {
        setEnableFilterRow(!enableFilterRow);
    }

    const handleSort = useCallback((columnKey, direction) => {
        setSort([columnKey, direction]);
    }, []);

    return (
        <Flex flexGrow="1" className="header-filters-example" width="100%">
            <Flex minHeight="3em" alignItems="center" justifyContent="center" className="header-filters-toolbar">
                <Group>
                    <Button size="small" type="button" onClick={toggleFilters}>Toggle Filters</Button>
                    {' '}
                    <Button size="small" type="button" onClick={clearFilters}>Clear Filters</Button>
                </Group>
            </Flex>
            <DataGrid
                columns={columns}
                rows={filteredRows}
                defaultColumnOptions={{
                    sortable: true,
                    resizable: true
                }}
                onSort={handleSort}
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                filters={filters}
                enableFilterRow={enableFilterRow}
                onFiltersChange={setFilters}
            />
        </Flex>
    );
}

export default HeaderFilters;