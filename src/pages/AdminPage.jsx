import React, { useState, useEffect, useMemo } from 'react';
import { Container, Button, Spinner, Alert, Badge } from 'react-bootstrap';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import { useAuth } from '../context/AuthContext';
import { getAllUsers, deleteUser, updateUser } from '../api/users';

const AdminPage = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [columnOrder, setColumnOrder] = useState([]);
  const [sorting, setSorting] = useState([]);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (window.confirm('Вы уверены, что хотите удалить этого пользователя?')) {
      try {
        await deleteUser(userId);
        await loadUsers();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleToggleBlock = async (userId, isCurrentlyActive) => {
    try {
      await updateUser(userId, { isActive: !isCurrentlyActive });
      await loadUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  const columns = useMemo(
    () => [
      {
        id: 'id',
        accessorKey: 'id',
        header: 'ID',
      },
      {
        id: 'email',
        accessorKey: 'email',
        header: 'Email',
      },
      {
        id: 'name',
        accessorKey: 'name',
        header: 'Имя',
      },
      {
        id: 'role',
        accessorKey: 'role',
        header: 'Роль',
      },
      {
        id: 'isActive',
        accessorKey: 'isActive',
        header: 'Статус',
        cell: ({ row }) => (
          <Badge
            bg={row.original.isActive ? 'success' : 'danger'}
            className="cursor-pointer"
            onClick={() => handleToggleBlock(row.original.id, row.original.isActive)}
          >
            {row.original.isActive ? 'Активен' : 'Заблокирован'}
          </Badge>
        ),
      },
      {
        id: 'createdAt',
        accessorKey: 'createdAt',
        header: 'Дата регистрации',
        cell: ({ getValue }) => new Date(getValue()).toLocaleDateString(),
      },
      {
        id: 'actions',
        header: 'Действия',
        cell: ({ row }) => (
          <div className="d-flex gap-2">
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => handleDelete(row.original.id)}
              disabled={row.original.id === currentUser?.id}
            >
              Удалить
            </Button>
          </div>
        ),
      },
    ],
    [currentUser]
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

  useEffect(() => {
    if (columns.length && columnOrder.length === 0) {
      setColumnOrder(columns.map((col) => col.id));
    }
  }, [columns, columnOrder]);

  if (currentUser?.role !== 'admin') {
    return (
      <Container className="mt-4">
        <Alert variant="danger">Доступ запрещен. Требуются права администратора.</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Панель администратора</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <div className="table-responsive" style={{ maxHeight: '500px', overflowY: 'auto' }}>
        <table className="table">
          {/* Фиксированный заголовок */}
          <thead className="sticky-header">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{ width: header.getSize() }}
                    onClick={header.column.getToggleSortingHandler()}
                    className="cursor-pointer"
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData('colId', header.id)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      const draggedColId = e.dataTransfer.getData('colId');
                      if (draggedColId && draggedColId !== header.id) {
                        const newOrder = [...columnOrder];
                        const fromIndex = newOrder.indexOf(draggedColId);
                        const toIndex = newOrder.indexOf(header.id);
                        newOrder.splice(fromIndex, 1);
                        newOrder.splice(toIndex, 0, draggedColId);
                        setColumnOrder(newOrder);
                      }
                    }}
                  >
                    <div className="d-flex align-items-center">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      <span className="ms-2">
                        {{
                          asc: '↑',
                          desc: '↓',
                        }[header.column.getIsSorted()] ?? '↕'}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          {/* Тело таблицы */}
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="text-center">
                  <Spinner animation="border" />
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Button
        variant="primary"
        onClick={loadUsers}
        disabled={loading}
        className="mt-3"
      >
        {loading ? <Spinner size="sm" /> : 'Обновить данные'}
      </Button>

      <style jsx>{`
        /* Стили для фиксированного заголовка */
        .sticky-header {
          position: sticky;
          top: 0;
          z-index: 2;
          background-color: #f8f9fa; /* Цвет фона заголовка */
          border-bottom: 1px solid #dee2e6; /* Граница под заголовком */
        }
        .dark .sticky-header {
          background-color: #343a40; /* Темный режим */
          border-bottom-color: #495057;
        }
        .table-responsive {
          max-height: 500px; /* Ограничение высоты таблицы */
          overflow-y: auto; /* Включение вертикальной прокрутки */
        }
        th {
          position: relative;
          z-index: 1;
        }
        th[draggable="true"] {
          cursor: grab;
        }
        th[draggable="true"]:active {
          cursor: grabbing;
        }
      `}</style>
    </Container>
  );
};

export default AdminPage;