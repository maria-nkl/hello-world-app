import React, { useMemo, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import { Button, Spinner, Badge } from 'react-bootstrap';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const UsersTable = ({ users, onUpdate, loading }) => {
  const { user: currentUser } = useAuth();
  const { isDark } = useTheme();
  const [columnOrder, setColumnOrder] = useState([
    'id',
    'name',
    'email',
    'role',
    'isActive',
    'createdAt',
    'actions',
  ]);
  const [sorting, setSorting] = useState([]);

  const columns = useMemo(
    () => [
      {
        id: 'id',
        accessorKey: 'id',
        header: 'ID',
        size: 80,
        cell: ({ getValue }) => <span className="text-muted">#{getValue()}</span>,
      },
      {
        id: 'name',
        accessorKey: 'name',
        header: 'Имя',
        size: 150,
        cell: ({ getValue }) => getValue() || <span className="text-muted">Не указано</span>,
      },
      {
        id: 'email',
        accessorKey: 'email',
        header: 'Email',
        size: 200,
      },
      {
        id: 'role',
        accessorKey: 'role',
        header: 'Роль',
        size: 120,
        cell: ({ row, getValue }) => (
          <select
            value={getValue()}
            onChange={(e) => onUpdate(row.original.id, { role: e.target.value })}
            disabled={row.original.id === currentUser?.id}
            className={`form-select form-select-sm ${isDark ? 'bg-dark text-white' : ''}`}
          >
            <option value="user">Пользователь</option>
            <option value="admin">Администратор</option>
          </select>
        ),
      },
      {
        id: 'isActive',
        accessorKey: 'isActive',
        header: 'Статус',
        size: 120,
        cell: ({ row, getValue }) => (
          <Badge
            bg={getValue() ? 'success' : 'danger'}
            className="cursor-pointer"
            onClick={() =>
              row.original.id !== currentUser?.id &&
              onUpdate(row.original.id, { isActive: !getValue() })
            }
          >
            {getValue() ? 'Активен' : 'Заблокирован'}
          </Badge>
        ),
      },
      {
        id: 'createdAt',
        accessorKey: 'createdAt',
        header: 'Дата регистрации',
        size: 150,
        cell: ({ getValue }) => new Date(getValue()).toLocaleDateString(),
      },
      {
        id: 'actions',
        header: 'Действия',
        size: 120,
        cell: ({ row }) => (
          <div className="d-flex gap-2">
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => onUpdate(row.original.id, { delete: true })}
              disabled={row.original.id === currentUser?.id}
              title="Удалить пользователя"
            >
              <i className="bi bi-trash"></i>
            </Button>
          </div>
        ),
      },
    ],
    [currentUser, isDark, onUpdate]
  );

  const table = useReactTable({
    data: users,
    columns,
    state: {
      columnOrder,
      sorting,
    },
    onColumnOrderChange: setColumnOrder,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const Row = ({ index, style }) => {
    const row = table.getRowModel().rows[index];
    return (
      <div style={style} className="tr">
        {row.getVisibleCells().map((cell, cellIndex) => (
          <div
            key={cell.id}
            className={`td ${cellIndex === 0 ? 'sticky-column' : ''}`}
            style={{ left: cellIndex === 0 ? 0 : undefined }}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={`table-container ${isDark ? 'dark' : ''}`}>
      <div className="table">
        {/* Фиксированный заголовок */}
        <div className="thead sticky-header">
          {table.getHeaderGroups().map((headerGroup) => (
            <div key={headerGroup.id} className="tr">
              {headerGroup.headers.map((header, headerIndex) => (
                <div
                  key={header.id}
                  className={`th ${headerIndex === 0 ? 'sticky-column' : ''}`}
                  colSpan={header.colSpan}
                  style={{
                    width: header.getSize(),
                    left: headerIndex === 0 ? 0 : undefined,
                  }}
                  draggable
                  onDragStart={(e) => handleDragStart(e, header)}
                  onDragEnd={handleDragEnd}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDrop(e, header)}
                >
                  <div
                    onClick={header.column.getToggleSortingHandler()}
                    className="d-flex align-items-center"
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    <span className="ms-2">
                      {{
                        asc: <i className="bi bi-arrow-up"></i>,
                        desc: <i className="bi bi-arrow-down"></i>,
                      }[header.column.getIsSorted()] ?? <i className="bi bi-arrow-down-up text-muted"></i>}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Тело таблицы */}
        <div className="tbody">
          {loading && users.length === 0 ? (
            <div className="loading-placeholder">
              <Spinner animation="border" />
              <span>Загрузка пользователей...</span>
            </div>
          ) : (
            <AutoSizer>
              {({ height, width }) => (
                <List
                  height={height || 500}
                  itemCount={table.getRowModel().rows.length}
                  itemSize={60}
                  width={width}
                >
                  {Row}
                </List>
              )}
            </AutoSizer>
          )}
        </div>
      </div>

      <style jsx>{`
        .table-container {
          border: 1px solid #dee2e6;
          border-radius: 4px;
          overflow: hidden;
        }
        .table-container.dark {
          border-color: #495057;
        }
        .table {
          display: flex;
          flex-direction: column;
          width: 100%;
          overflow-x: auto;
        }
        .thead {
          display: flex;
          flex-direction: column;
          background-color: #f8f9fa;
          position: sticky; /* Фиксация заголовка */
          top: 0;
          z-index: 3;
        }
        .dark .thead {
          background-color: #343a40;
        }
        .sticky-header {
          position: sticky;
          top: 0;
          z-index: 3;
          background: ${isDark ? '#343a40' : '#f8f9fa'};
        }
        .tr {
          display: flex;
        }
        .th,
        .td {
          padding: 12px;
          border-bottom: 1px solid #dee2e6;
          flex: 1 0 auto;
          min-width: 100px;
          display: flex;
          align-items: center;
        }
        .dark .th,
        .dark .td {
          border-bottom-color: #495057;
        }
        .sticky-column {
          position: sticky;
          left: 0;
          z-index: 2;
          background: ${isDark ? '#343a40' : '#f8f9fa'};
        }
        .th {
          font-weight: 600;
          background-color: inherit;
          cursor: pointer;
          user-select: none;
          position: relative;
        }
        .th:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }
        .dark .th:hover {
          background-color: rgba(255, 255, 255, 0.05);
        }
        .th[draggable="true"] {
          cursor: grab;
        }
        .th[draggable="true"]:active {
          cursor: grabbing;
        }
        .loading-placeholder {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          gap: 10px;
        }
        @media (max-width: 768px) {
          .table-container {
            overflow-x: auto;
            position: relative;
          }
        }
      `}</style>
    </div>
  );
};

export default UsersTable;